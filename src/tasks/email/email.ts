import nodemailer from 'nodemailer';
import { NextRequest, NextResponse } from "next/server";
 

// Configure the Nodemailer transporter
 function createTransporter() {
  const emailUser = process.env.SMTP_EMAIL;
  const emailPassword = process.env.SMTP_PASS;
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port:587,
    secure: false,
    auth: {
      user: emailUser,
      pass:emailPassword,
    },
  });
  return transporter;
}


//option for the mail to be sent
function mailOptions(email: string, name: string, sendOffset: string) {
  const sendOffsetInMinutes = Number(sendOffset);

  // Divide by 60 to convert to hours
  const hoursLeft = sendOffsetInMinutes / 60;
  return {
    from: `"Neutroline Support" <${process.env.SMTP_EMAIL}>`, // Sender's emai3l address
    to: email, // Recipient's email address
    subject: "Appointment Reminder", // Email subject
    html: `<div
        style="
        max-width:90%;
        background-color: rgba(243, 240, 236, 0.4);
        margin:0 auto;
        ">
            <div style="background-color: #f0f0f0;">
                <img
                src="https://www.neutroline.com/public/images/logo.png"
                style="display:block;margin: 0 auto;height: 10%; width: 15%; padding: 1% 0 0.5% 0%;"
                alt="Logo"
                />
            </div>
            <div style="padding: 0 5% 1%;font-size: 1.1rem;letter-spacing: 0.5px;">
            <p>Dear ${name},</p>
            <p>You have around ${hoursLeft} left for the appointment.</p>
            
            <p>Thank You,<br/>
                Team<br/>
                info@neutroline.com</p>
            <p style="font-size:0.9rem;color:#808080">This is an automated message and replies to this email will not be monitored. If you have any questions or need assistance, please contact us at 
            <a href="mailto:info@.com">info@.neutrolinecom</a>.</p>
            </div>
        </div>
`,
  };
}



export async function sendReminderEmail(email: string,name: string,sendOffset: string) {

  const transporter = createTransporter();

  const options = mailOptions(email, name, sendOffset);
 

  // Send email
  await  transporter.sendMail(options);
  
  // Respond with success message
  return NextResponse.json(
    {
      message: `Email success.`,
    },
    { status: 200 }
  );
}
