
function createPDF(caseFile){
	var pdf = new jsPDF('p', 'mm', 'a4');

	pdf.setFontSize(20);
	pdf.setFont("sans-serif");
	pdf.setFontType("bold");
	pdf.text(20,30, "Report for Incident " + caseFile.id.toString());

	pdf.setFontSize(12);
	pdf.setFontType("unbold");
	pdf.setFont("sans-serif");
	pdf.text(20,35, "Category: " + caseFile.category);
	

	pdf.setFont("sans-serif");
	pdf.text(20,42, "Date: " + caseFile.date.substring(0,10));
	pdf.setFont("sans-serif");
	pdf.text(20,46, "Location: " + caseFile.address);
	
	pdf.setFont("sans-serif");
	pdf.text(20,50, "Description: " + caseFile.description);

	pdf.save('report');


} 