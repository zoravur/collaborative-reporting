import numpy as np
import cv2
import requests


#url = 'https://firebasestorage.googleapis.com/v0/b/collaborative-reporting.appspot.com/o/Helooo%203%2F1528535277208-armed-robber.mp4?alt=media&token=e8648606-1a6c-4c10-a236-e8e68445e233'
#r = requests.get(url, allow_redirects=True)
#open('asdf.mp4', 'wb').write(r.content)


cap = cv2.VideoCapture('media/video.mp4')

frame_array = []
fps = cap.get(cv2.CAP_PROP_FPS)

success, img = cap.read()

while success:
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

    face_cascade = cv2.CascadeClassifier('classifiers/frontalface.xml')

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

out = cv2.VideoWriter("media/processed.avi",cv2.VideoWriter_fourcc(*'DIVX'), fps, size)
for i in range(len(frame_array)):
    # writing to a image array
    out.write(frame_array[i])
out.release()

cap.release()
cv2.destroyAllWindows()
