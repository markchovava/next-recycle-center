import type { Metadata } from "next";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "@/_components/footers/Footer";


export const metadata: Metadata = {
  title: "RecycleMate",
  description: "The RecycleMate app",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body
<<<<<<< HEAD
        className={`antialiased min-h-[100vh]`}>
=======
        className={`antialiased min-h-full`}>
>>>>>>> 6395e4f952a333e69b8b1a2550606a00ed21b7bf
        {children}

         <Footer />

        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark" 
        />

      </body>
    </html>
  );
}
