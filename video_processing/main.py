import numpy as np
import cv2
import pyrebase
import sys

path = sys.argv[1]

config = {
  "apiKey": 'AIzaSyD8JJvhxuwmYyJfftVTST-Id-SeMsxrAHs',
  "authDomain": 'collaborative-reporting.firebaseapp.com',
  "databaseURL": 'https://collaborative-reporting.firebaseio.com',
  "storageBucket": 'collaborative-reporting.appspot.com',
}

firebase = pyrebase.initialize_app(config)
storage = firebase.storage()

fileExtension = path[path.rfind(".")+1:]
directory = path[:path.rfind("/")+1]
storage.child(path).download("video_processing/media/video." + fileExtension)

cap = cv2.VideoCapture('video_processing/media/video.' + fileExtension)

frame_array = []
fps = cap.get(cv2.CAP_PROP_FPS)

success, img = cap.read()

while success:
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

    face_cascade = cv2.CascadeClassifier('video_processing/classifiers/frontalface.xml')

    faces = face_cascade.detectMultiScale(gray, 1.3, 5)
    for (x,y,w,h) in faces:
        img = cv2.rectangle(img,(x,y),(x+w,y+h),(255,0,0),2)
        roi_gray = gray[y:y+h, x:x+w]
        roi_color = img[y:y+h, x:x+w]

    if(len(faces) >= 1):
        frame_array.append(img)

    success, img = cap.read()

height, width, layers = frame_array[0].shape
size = (width,height)

out = cv2.VideoWriter("video_processing/media/processed.avi",cv2.VideoWriter_fourcc(*'DIVX'), fps, size)
for i in range(len(frame_array)):
    # writing to a image array
    out.write(frame_array[i])
out.release()

storage.child(directory + "processed.avi").put("video_processing/media/processed.avi")

cap.release()
cv2.destroyAllWindows()
