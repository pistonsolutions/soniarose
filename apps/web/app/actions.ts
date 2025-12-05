'use server'

export async function submitContactForm(prevState: any, formData: FormData) {
    const firstName = formData.get('firstName')
    const lastName = formData.get('lastName')
    const email = formData.get('email')
    const phone = formData.get('phone')
    const message = formData.get('message')

    // Basic validation
    if (!firstName || !lastName || !email || !message) {
        return { message: 'Veuillez remplir tous les champs obligatoires.', success: false }
    }

    // Simulate sending email (log to console)
    console.log('Contact Form Submission:', {
        firstName,
        lastName,
        email,
        phone,
        message,
        timestamp: new Date().toISOString(),
    })

    // Simulate delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    return { message: 'Votre message a été envoyé avec succès !', success: true }
}
