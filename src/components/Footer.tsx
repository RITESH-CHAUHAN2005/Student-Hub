
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const Footer = () => {
  const [dialogContent, setDialogContent] = useState<{
    title: string;
    content: React.ReactNode;
  } | null>(null);

  const openDialog = (title: string, content: React.ReactNode) => {
    setDialogContent({ title, content });
  };

  const closeDialog = () => {
    setDialogContent(null);
  };

  const privacyPolicy = (
    <div className="space-y-4 text-left">
      <p>
        Last updated: May 12, 2025
      </p>
      
      <h3 className="text-lg font-semibold">1. Information We Collect</h3>
      <p>
        We collect information you provide directly to us when you use our platform, including
        personal information such as your name, email address, and other contact details.
        We also collect usage data such as access times, pages viewed, and system activity.
      </p>
      
      <h3 className="text-lg font-semibold">2. How We Use Your Information</h3>
      <p>
        We use the information we collect to operate, maintain, and improve our platform,
        to communicate with you, to respond to your comments and questions, and to provide customer service.
      </p>
      
      <h3 className="text-lg font-semibold">3. Data Security</h3>
      <p>
        We implement appropriate security measures to protect your personal information from
        unauthorized access, alteration, disclosure, or destruction.
      </p>
      
      <h3 className="text-lg font-semibold">4. Your Rights</h3>
      <p>
        You have the right to access, correct, or delete your personal information.
        You can contact us to exercise these rights at privacy@studenthub.com.
      </p>
    </div>
  );

  const termsOfService = (
    <div className="space-y-4 text-left">
      <p>
        Last updated: May 12, 2025
      </p>
      
      <h3 className="text-lg font-semibold">1. Acceptance of Terms</h3>
      <p>
        By accessing or using the Student Hub platform, you agree to be bound by these Terms of Service.
        If you do not agree to all the terms, you may not access or use our services.
      </p>
      
      <h3 className="text-lg font-semibold">2. User Accounts</h3>
      <p>
        You are responsible for maintaining the security of your account and password.
        The company cannot and will not be liable for any loss or damage from your failure to comply with this security obligation.
      </p>
      
      <h3 className="text-lg font-semibold">3. Content and Conduct</h3>
      <p>
        Users are solely responsible for the content they submit to the platform.
        You agree not to post content that is illegal, offensive, or infringes on the intellectual property rights of others.
      </p>
      
      <h3 className="text-lg font-semibold">4. Termination</h3>
      <p>
        We reserve the right to suspend or terminate your account at our discretion, without notice,
        particularly for conduct that we believe violates these Terms of Service or is harmful to other users.
      </p>
    </div>
  );

  const contactInfo = (
    <div className="space-y-4 text-left">
      <h3 className="text-lg font-semibold">Get In Touch</h3>
      <p>
        We're here to help with any questions or concerns you may have about our platform.
      </p>
      
      <h3 className="text-lg font-semibold">Contact Information</h3>
      <ul className="space-y-2">
        <li><strong>Email:</strong> support@studenthub.com</li>
        <li><strong>Phone:</strong> +1 (555) 123-4567</li>
        <li><strong>Address:</strong> 1234 Education Ave, Suite 100, Knowledge City, KS 12345</li>
      </ul>
      
      <h3 className="text-lg font-semibold">Hours of Operation</h3>
      <p>
        Monday - Friday: 9:00 AM - 6:00 PM EST<br />
        Saturday - Sunday: Closed
      </p>
      
      <h3 className="text-lg font-semibold">Send us a message</h3>
      <form className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium">Name</label>
          <input type="text" id="name" className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2" />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium">Email</label>
          <input type="email" id="email" className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2" />
        </div>
        <div>
          <label htmlFor="message" className="block text-sm font-medium">Message</label>
          <textarea id="message" rows={4} className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"></textarea>
        </div>
        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
          Send Message
        </button>
      </form>
    </div>
  );

  return (
    <footer className="border-t py-6 md:py-8">
      <div className="container flex flex-col items-center justify-center gap-4 text-center md:flex-row md:justify-between md:text-left">
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Student Hub. All rights reserved.
        </p>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <a 
            href="#" 
            className="hover:text-foreground transition-colors"
            onClick={(e) => {
              e.preventDefault();
              openDialog("Privacy Policy", privacyPolicy);
            }}
          >
            Privacy Policy
          </a>
          <a 
            href="#" 
            className="hover:text-foreground transition-colors"
            onClick={(e) => {
              e.preventDefault();
              openDialog("Terms of Service", termsOfService);
            }}
          >
            Terms of Service
          </a>
          <a 
            href="#" 
            className="hover:text-foreground transition-colors"
            onClick={(e) => {
              e.preventDefault();
              openDialog("Contact Us", contactInfo);
            }}
          >
            Contact
          </a>
        </div>
      </div>
      
      {dialogContent && (
        <Dialog open={true} onOpenChange={closeDialog}>
          <DialogContent className="max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{dialogContent.title}</DialogTitle>
            </DialogHeader>
            <div className="py-4">{dialogContent.content}</div>
          </DialogContent>
        </Dialog>
      )}
    </footer>
  );
};

export default Footer;
