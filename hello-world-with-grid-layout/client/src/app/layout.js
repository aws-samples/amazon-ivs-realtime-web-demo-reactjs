import "./globals.css"; // Import the global CSS file

export const metadata = {
  title: "Real Time Streaming", // Specify the title for the web page
  description: "Real-time streaming on AWS enables the seamless and instantaneous delivery of audio, video, or data content to end-users, leveraging AWS services and infrastructure."
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/milligram/1.4.1/milligram.css" // Link to the Milligram CSS stylesheet
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
