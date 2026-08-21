import { google } from "googleapis";

const auth = new google.auth.GoogleAuth({
  credentials: {
    project_id: process.env.GOOGLE_PROJECT_ID,
    client_email: process.env.GOOGLE_CLIENT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
  },
  scopes: [
    "https://www.googleapis.com/auth/spreadsheets",
  ],
});

export async function appendToSheet(data: {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
}) {
  console.log("===== GOOGLE SHEETS DEBUG =====");
  console.log("PROJECT ID:", process.env.GOOGLE_PROJECT_ID);
  console.log("CLIENT EMAIL:", process.env.GOOGLE_CLIENT_EMAIL);
  console.log("SHEET ID:", process.env.GOOGLE_SHEET_ID);

  if (!process.env.GOOGLE_SHEET_ID) {
    throw new Error("GOOGLE_SHEET_ID is missing.");
  }

  const sheets = google.sheets({
    version: "v4",
    auth,
  });

  const date = new Date().toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
  });

  try {
    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: "Sheet1!A:G",
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [[
          date,
          data.name,
          data.email,
          data.phone,
          data.service,
          data.message,
          "New",
        ]],
      },
    });

    console.log("✅ Google Sheet updated successfully.");
  } catch (error) {
    console.error("❌ GOOGLE API ERROR:", error);
    throw error;
  }
}