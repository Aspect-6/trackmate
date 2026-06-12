import { useState } from "react"
import { useForm } from "react-hook-form"
import TrackMateLogo from "@shared/components/TrackMateLogo"
import { Title, FormField, FormFieldLabel, FormFieldTextInput, FormFieldTextArea, SubmitButton, HomeLink } from "@/app/components/AuthForm"
import { AUTH } from "@/app/styles/colors"

interface ContactFormData {
    name: string;
    email: string;
    message: string;
    botcheck?: boolean;
}

const Contact: React.FC = () => {
    const { register, handleSubmit, formState: { errors }, reset, watch } = useForm<ContactFormData>()
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")

    const messageContent = watch("message", "")
    const messageLength = messageContent?.length || 0

    const onSubmit = async (data: ContactFormData) => {
        setStatus("loading")

        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify({
                    access_key: "3b9fd3ca-60da-4661-9386-3472c4c86697",
                    name: data.name,
                    email: data.email,
                    message: data.message,
                    botcheck: data.botcheck || undefined
                }),
            });
            const result = await response.json();
            if (result.success) {
                setStatus("success");
                reset();
            } else {
                console.error("Form error:", result);
                setStatus("error");
            }
        } catch (error) {
            console.error("Network error:", error);
            setStatus("error");
        }
    }

    return (
        <div className="min-h-dvh flex items-center justify-center p-4">
            <div
                className="relative z-10 w-full max-w-md p-8 rounded-2xl shadow-2xl auth-card"
                style={{
                    backgroundColor: AUTH.BACKGROUND_SECONDARY,
                    border: `1px solid ${AUTH.BORDER_PRIMARY}`,
                }}
            >
                <div className="flex justify-between items-start">
                    <HomeLink />
                    <TrackMateLogo size={32} showBackground={false} className="-mt-1 -mr-1" />
                </div>
                <Title>Contact Us</Title>

                {status === "success" ? (
                    <form
                        className="text-center py-6 mt-4"
                        onSubmit={(e) => {
                            e.preventDefault();
                            setStatus("idle");
                        }}
                    >
                        <h3 className="text-xl font-semibold mb-2" style={{ color: AUTH.TEXT_PRIMARY }}>Message Sent!</h3>
                        <p className="text-sm mb-6" style={{ color: AUTH.TEXT_SECONDARY }}>
                            Thanks for reaching out. We'll get back to you as soon as possible.
                        </p>
                        <SubmitButton disabled={false}>
                            Send another message
                        </SubmitButton>
                    </form>
                ) : (
                    <form className="space-y-5 mt-6" onSubmit={handleSubmit(onSubmit)} noValidate>
                        <input
                            type="checkbox"
                            className="absolute -left-[9999px]"
                            tabIndex={-1}
                            aria-hidden="true"
                            {...register("botcheck")}
                        />

                        <FormField>
                            <FormFieldLabel htmlFor="name">Name</FormFieldLabel>
                            <FormFieldTextInput
                                type="text"
                                placeholder="Your Name"
                                id="name"
                                hasError={!!errors.name}
                                {...register("name", { required: "Name is required" })}
                            />
                            {errors.name && (
                                <span className="text-xs" style={{ color: AUTH.TEXT_DANGER }}>
                                    {errors.name.message}
                                </span>
                            )}
                        </FormField>

                        <FormField>
                            <FormFieldLabel htmlFor="email">Email</FormFieldLabel>
                            <FormFieldTextInput
                                type="email"
                                placeholder="you@example.com"
                                id="email"
                                hasError={!!errors.email}
                                {...register("email", {
                                    required: "Email is required",
                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                        message: "Invalid email address"
                                    }
                                })}
                            />
                            {errors.email && (
                                <span className="text-xs" style={{ color: AUTH.TEXT_DANGER }}>
                                    {errors.email.message}
                                </span>
                            )}
                        </FormField>

                        <FormField>
                            <FormFieldLabel htmlFor="message">Message</FormFieldLabel>
                            <FormFieldTextArea
                                id="message"
                                placeholder="How can we help?"
                                rows={4}
                                maxLength={1000}
                                hasError={!!errors.message}
                                {...register("message", { required: "Message is required" })}
                            />
                            <div className="flex justify-between items-start mt-1">
                                <div className="flex-1">
                                    {errors.message && (
                                        <span className="text-xs" style={{ color: AUTH.TEXT_DANGER }}>
                                            {errors.message.message}
                                        </span>
                                    )}
                                </div>
                                <span style={{
                                    color: messageLength >= 1000 ? AUTH.TEXT_DANGER : AUTH.TEXT_SECONDARY,
                                    fontSize: "10px"
                                }}>
                                    {messageLength}/1000
                                </span>
                            </div>
                        </FormField>

                        {status === "error" && (
                            <p className="text-center text-sm" style={{ color: AUTH.TEXT_DANGER }}>
                                Something went wrong. Please try again.
                            </p>
                        )}

                        <SubmitButton disabled={status === "loading"}>
                            {status === "loading" ? "Sending..." : "Send Message"}
                        </SubmitButton>
                    </form>
                )}
            </div>
        </div>
    )
}

export default Contact
