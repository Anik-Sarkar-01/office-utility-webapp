const fs = require("fs");
const path = require("path");
const fontkit = require("@pdf-lib/fontkit");
const { PDFDocument, StandardFonts, rgb } = require("pdf-lib");

module.exports = async function generateLeaveForm(data) {
  const filePath = path.join(__dirname, "../templates/LeaveApplicationForm.pdf");
  const fontPath = path.join(__dirname, "../fonts/DejaVuSans.ttf");

  const existingPdf = fs.readFileSync(filePath);
  const pdfDoc = await PDFDocument.load(existingPdf);

  // REQUIRED for custom fonts
  pdfDoc.registerFontkit(fontkit);

  // Standard font for normal text
  const textFont = await pdfDoc.embedFont(StandardFonts.Helvetica);

  // Unicode font for ✓
  const tickFontBytes = fs.readFileSync(fontPath);
  const tickFont = await pdfDoc.embedFont(tickFontBytes);

  const page = pdfDoc.getPages()[0];

  const drawWrappedText = (text, x, y, maxWidth, size = 10, lineHeight = 14) => {
    if (!text) return;

    const words = text.split(" ");
    let line = "";
    let cursorY = y;

    for (let i = 0; i < words.length; i++) {
      const testLine = line + words[i] + " ";
      const width = textFont.widthOfTextAtSize(testLine, size);

      if (width > maxWidth) {
        page.drawText(line, { x, y: cursorY, size, font: textFont });
        line = words[i] + " ";
        cursorY -= lineHeight;
      } else {
        line = testLine;
      }
    }

    // Draw remaining text
    page.drawText(line, { x, y: cursorY, size, font: textFont });
  };


  const draw = (text, x, y, size = 10) => {
    page.drawText(text || "", {
      x,
      y,
      size,
      font: textFont,
      color: rgb(0, 0, 0),
    });
  };

  // ✅ Real tick sign
  const tick = (x, y) => {
    page.drawText("✓", {
      x,
      y,
      size: 12,
      font: tickFont,
      color: rgb(0, 0, 0),
    });
  };

  console.log(data)

  // ---------------- TEXT FIELDS ----------------
  draw(data.date, 50, 758);
  draw(data.applicantName, 130, 740);
  draw(data.employeeId, 400, 740);
  draw(data.designation, 130, 722);
  draw(data.department, 400, 722);

  draw(data.leaveDays, 164, 688);
  draw(data.leaveFrom, 260, 688);
  draw(data.leaveTo, 420, 688);

  draw(data.availableCasual, 164, 633);
  draw(data.availableSick, 250, 633);
  draw(data.availableAnnual, 335, 633);


  draw(data.station, 130, 613);
  draw(data.contact, 400, 613);

  draw(data.personInCharge, 130, 584);
  draw(data.reportingTo, 130, 545);

  drawWrappedText(data.reason, 120, 503, 340);

  draw(data.date, 465, 458);

  // Applicant Copy
  draw(data.date, 50, 270);
  draw(data.applicantName, 130, 252);
  draw(data.employeeId, 400, 252);
  draw(data.designation, 130, 233);
  draw(data.department, 400, 233);
  draw(data.leaveDays, 164, 200);
  draw(data.leaveFrom, 260, 200);
  draw(data.leaveTo, 420, 200);
  draw(data.availableCasual, 164, 145);
  draw(data.availableSick, 250, 145);
  draw(data.availableAnnual, 335, 145);

  // ---------------- CHECKBOXES ----------------

  if (data.halfDay === "Not Required") {
    tick(188, 669);
    tick(188, 180);
  }

  if (data.halfDay === "Morning") {
    tick(268, 669);
    tick(268, 180);
  }

  if (data.halfDay === "Evening") {
    tick(457, 669);
    tick(457, 180);
  }

  // Leave Type
  switch (data.leaveType) {
    case "Casual":
      tick(188, 650);
      tick(188, 162);
      break;
    case "Sick":
      tick(268, 650);
      tick(268, 162);
      break;
    case "Annual":
      tick(352, 650);
      tick(352, 162);
      break;
    case "Replacement":
      tick(457, 650);
      tick(457, 162);
      break;
    case "Without Pay":
      tick(532, 652);
      tick(532, 162);
      break;
    default:
      console.log("No leave type selected");
  }


  return await pdfDoc.save();
};