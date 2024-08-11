import React from "react";

const Resume = () => {
  // Path to the PDF file
  const pdfUrl = "./files/ayush-cv-aug-9.pdf";

  // Function to handle the PDF opening in a new tab
  const openPdfInNewTab = () => {
    window.open(pdfUrl, "_blank");
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="mt-4">
        <a
          href={pdfUrl}
          download="ayush-cv-aug-9.pdf"
          className="px-4 py-2 text-white rounded hover:bg-orange-600"
        >
          Download Resume
        </a>
      </div>
      {/* Image 1 */}
      <div className="w-full max-w-3xl" onClick={openPdfInNewTab}>
        <img
          src="./files/ayush1.png"
          alt="Ayush Page 1"
          className="w-full h-auto object-contain cursor-pointer"
        />
      </div>
      {/* Image 2 */}
      <div className="w-full max-w-3xl" onClick={openPdfInNewTab}>
        <img
          src="./files/ayush2.png"
          alt="Ayush Page 2"
          className="w-full h-auto object-contain cursor-pointer"
        />
      </div>
    </div>
  );
};

export default Resume;
