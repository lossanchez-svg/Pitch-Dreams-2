import { Resend } from 'resend'

// Initialize Resend client (lazy initialization)
let resendClient: Resend | null = null

function getResendClient(): Resend | null {
  if (!process.env.RESEND_API_KEY) {
    console.warn('RESEND_API_KEY not configured - emails will not be sent')
    return null
  }
  if (!resendClient) {
    resendClient = new Resend(process.env.RESEND_API_KEY)
  }
  return resendClient
}

// Email sender configuration
const FROM_EMAIL = process.env.EMAIL_FROM || 'PitchDreams <noreply@pitchdreams.com>'

interface SendEmailResult {
  success: boolean
  messageId?: string
  error?: string
}

/**
 * Send a password reset email
 */
export async function sendPasswordResetEmail(
  email: string,
  resetUrl: string
): Promise<SendEmailResult> {
  const resend = getResendClient()

  if (!resend) {
    // In development without Resend configured, log the URL
    console.log('='.repeat(60))
    console.log('PASSWORD RESET EMAIL (dev mode - no email sent)')
    console.log(`To: ${email}`)
    console.log(`Reset URL: ${resetUrl}`)
    console.log('='.repeat(60))
    return { success: true, messageId: 'dev-mode' }
  }

  try {
    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: 'Reset your PitchDreams password',
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Reset Your Password</title>
          </head>
          <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%); padding: 30px; border-radius: 12px 12px 0 0; text-align: center;">
              <h1 style="color: white; margin: 0; font-size: 28px;">PitchDreams</h1>
              <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0;">Youth Soccer Training</p>
            </div>

            <div style="background: #f9fafb; padding: 30px; border: 1px solid #e5e7eb; border-top: none;">
              <h2 style="color: #1f2937; margin-top: 0;">Reset Your Password</h2>

              <p>We received a request to reset your password. Click the button below to create a new password:</p>

              <div style="text-align: center; margin: 30px 0;">
                <a href="${resetUrl}" style="display: inline-block; background: #6366f1; color: white; padding: 14px 28px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 16px;">
                  Reset Password
                </a>
              </div>

              <p style="color: #6b7280; font-size: 14px;">
                This link will expire in 1 hour. If you didn't request a password reset, you can safely ignore this email.
              </p>

              <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 25px 0;">

              <p style="color: #9ca3af; font-size: 12px; margin-bottom: 0;">
                If the button doesn't work, copy and paste this URL into your browser:<br>
                <a href="${resetUrl}" style="color: #6366f1; word-break: break-all;">${resetUrl}</a>
              </p>
            </div>

            <div style="text-align: center; padding: 20px; color: #9ca3af; font-size: 12px;">
              <p style="margin: 0;">&copy; ${new Date().getFullYear()} PitchDreams. All rights reserved.</p>
            </div>
          </body>
        </html>
      `,
      text: `
Reset Your PitchDreams Password

We received a request to reset your password. Visit the link below to create a new password:

${resetUrl}

This link will expire in 1 hour. If you didn't request a password reset, you can safely ignore this email.

- The PitchDreams Team
      `.trim(),
    })

    if (error) {
      console.error('Failed to send password reset email:', error)
      return { success: false, error: error.message }
    }

    console.log(`Password reset email sent to ${email}, messageId: ${data?.id}`)
    return { success: true, messageId: data?.id }
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown error'
    console.error('Error sending password reset email:', errorMessage)
    return { success: false, error: errorMessage }
  }
}
