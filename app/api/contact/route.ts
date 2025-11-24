import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;
    const service = formData.get('service') as string;
    const message = formData.get('message') as string;
    const file = formData.get('file') as File | null;

    // Validate required fields
    if (!name || !email || !phone || !service || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Create submission data
    const submission = {
      timestamp: new Date().toISOString(),
      name,
      email,
      phone,
      service,
      message,
      hasFile: !!file,
      fileName: file?.name || null,
    };

    // Save to file (for development)
    // In production, you would send this to an email service or database
    try {
      const submissionsDir = join(process.cwd(), 'submissions');
      await mkdir(submissionsDir, { recursive: true });
      
      const fileName = `submission-${Date.now()}.json`;
      const filePath = join(submissionsDir, fileName);
      
      await writeFile(filePath, JSON.stringify(submission, null, 2));
      
      // If file was uploaded, save it
      if (file) {
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const uploadPath = join(submissionsDir, `file-${Date.now()}-${file.name}`);
        await writeFile(uploadPath, buffer);
      }
    } catch (fileError) {
      console.error('Error saving submission:', fileError);
      // Continue even if file save fails
    }

    // Log to console for development
    console.log('Contact form submission:', submission);

    // In production, integrate with email service here
    // Example: await sendEmail({ to: 'info@smartscrews.com', ...submission });

    return NextResponse.json(
      { 
        success: true,
        message: 'Your message has been received. We will get back to you soon.' 
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error processing contact form:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

