import { UserInfo } from '../types';

/**
 * Service to handle external storage of user data via Google Sheets.
 * 
 * FOR DEVELOPERS CLONING THIS REPO:
 * 1. Create a Google Sheet.
 * 2. Go to Extensions > Apps Script.
 * 3. Add a script to handle POST requests (doPost) and append rows.
 * 4. Deploy the script as a Web App (Access: Anyone).
 * 5. Paste the 'Current web app URL' below.
 */

// ---------------------------------------------------------
// CONFIGURATION
// ---------------------------------------------------------
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbz5CYgAQ1tgLvSybGz--IDBHx8K53-S1jpOIydf2Ir7SEIOSMG8HgYNXs-jKffo6KeP3w/exec"; 

export const saveUserToExternalStorage = async (userInfo: UserInfo): Promise<boolean> => {
  console.log(`[Storage Protocol] Initiating secure transfer for subject: ${userInfo.email}`);

  // Fallback: Always save locally just in case
  localStorage.setItem('breakfear_user_backup', JSON.stringify(userInfo));

  if (!GOOGLE_SCRIPT_URL) {
    console.warn("Google Script URL not set. Data saved to local storage only.");
    return true;
  }

  try {
    // We use mode: 'no-cors' because Google Scripts handles cross-origin requests strictly.
    // 'no-cors' allows us to send the data (POST) without the browser blocking the response.
    // The downside is we can't read the response (e.g., "Success"), but the data WILL arrive in the sheet.
    await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors', 
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userInfo),
    });

    console.log("[Storage Protocol] Data transmission sent.");
    return true;
  } catch (error) {
    console.error("[Storage Protocol] Connection failed:", error);
    // Return true anyway to allow the user into the app
    return true;
  }
};