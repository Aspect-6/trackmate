import React from "react"
import TrackMateLogo from "@shared/components/TrackMateLogo"
import Header from "@/pages/Landing/components/Header"
import Footer from "@/pages/Landing/components/Footer"
import LegalSection from "@/app/components/legalDocumentComponents/LegalSection"
import LegalHeading from "@/app/components/legalDocumentComponents/LegalHeading"
import LegalParagraph from "@/app/components/legalDocumentComponents/LegalParagraph"
import LegalList from "@/app/components/legalDocumentComponents/LegalList"
import LegalListItem from "@/app/components/legalDocumentComponents/LegalListItem"
import LegalTableOfContents from "@/app/components/legalDocumentComponents/LegalTableOfContents"
import { BRAND_NAME } from "@shared/config/brand"
import { LANDING } from "@/app/styles/colors"

const PrivacyPolicy: React.FC = () => {
    const contactEmail = (
        <a href="mailto:contact@trackmate.co" className="font-semibold underline">contact@trackmate.co</a>
    )

    const privacyData = [
        {
            id: "introduction",
            title: "Introduction",
            content: (
                <>
                    <LegalParagraph>
                        This Privacy Policy for TrackMate ("<strong>we</strong>," "<strong>us</strong>," or "<strong>our</strong>"), describes how and why we might access, collect, store, use, and/or share ("<strong>process</strong>") your personal information when you use our services ("<strong>Services</strong>"), including when you:
                    </LegalParagraph>
                    <LegalParagraph>
                        <strong>Questions or concerns?</strong> Reading this Privacy Policy will help you understand your privacy rights and choices. We are responsible for making decisions about how your personal information is processed. If you do not agree with our policies and practices, please do not use our Services.
                    </LegalParagraph>
                </>
            )
        },
        {
            id: "summary-of-key-points",
            title: "Summary of Key Points",
            content: (
                <>
                    <LegalParagraph>
                        <strong>This summary provides key points from our Privacy Policy, but you can find out more details about any of these topics by clicking the link following each key point or by using our table of contents below to find the section you are looking for.</strong>
                    </LegalParagraph>
                    <LegalParagraph>
                        <strong>What personal information do we process?</strong> When you visit, use, or navigate our Services, we may process personal information depending on how you interact with us and the Services, the choices you make, and the products and features you use. Learn more about personal information you disclose to us.
                    </LegalParagraph>
                    <LegalParagraph>
                        <strong>Do we process any sensitive personal information?</strong> Some of the information may be considered "special" or "sensitive" in certain jurisdictions. We do not process sensitive personal information.
                    </LegalParagraph>
                    <LegalParagraph>
                        <strong>Do we collect any information from third parties?</strong> We may collect information from public databases, marketing partners, social media platforms, and other outside sources. Learn more about information collected from other sources.
                    </LegalParagraph>
                    <LegalParagraph>
                        <strong>How do we process your information?</strong> We process your information to provide, improve, and administer our Services, communicate with you, for security and fraud prevention, and to comply with law. We may also process your information for other purposes with your consent. We process your information only when we have a valid legal reason to do so. Learn more about how we process your information.
                    </LegalParagraph>
                    <LegalParagraph>
                        <strong>In what situations and with which parties do we share personal information?</strong> We may share information in specific situations and with specific third parties. Learn more about when and with whom we share your personal information.
                    </LegalParagraph>
                    <LegalParagraph>
                        <strong>What are your rights?</strong> Depending on where you are located geographically, the applicable privacy law may mean you have certain rights regarding your personal information. Learn more about your privacy rights.
                    </LegalParagraph>
                    <LegalParagraph>
                        <strong>How do you exercise your rights?</strong> The easiest way to exercise your rights is by submitting a data subject access request, or by contacting us. We will consider and act upon any request in accordance with applicable data protection laws.
                    </LegalParagraph>
                    <LegalParagraph>
                        Want to learn more about what we do with any information we collect? Review the Privacy Policy in full.
                    </LegalParagraph>
                </>
            )
        },
        {
            id: "what-information-do-we-collect",
            sectionNumber: 1,
            title: "What Information Do We Collect?",
            content: (
                <>
                    <LegalHeading>Personal information you disclose to us</LegalHeading>
                    <LegalParagraph>
                        <strong>In Short:</strong> <em>We collect personal information that you provide to us.</em>
                    </LegalParagraph>
                    <LegalParagraph>
                        We collect personal information that you voluntarily provide to us when you register on the Services, express an interest in obtaining information about us or our products and Services, when you participate in activities on the Services, or otherwise when you contact us.
                    </LegalParagraph>
                    <LegalParagraph>
                        <strong>Sensitive Information</strong>: We do not process sensitive information.
                    </LegalParagraph>
                    <LegalParagraph>
                        All personal information that you provide to us must be true, complete, and accurate, and you must notify us of any changes to such personal information.
                    </LegalParagraph>
                    <LegalHeading>Information automatically collected</LegalHeading>
                    <LegalParagraph>
                        <strong>In Short:</strong> <em>Some information — such as your Internet Protocol (IP) address and/or browser and device characteristics — is collected automatically when you visit our Services.</em>
                    </LegalParagraph>
                    <LegalParagraph>
                        We automatically collect certain information when you visit, use, or navigate the Services. This information does not reveal your specific identity (like your name or contact information) but may include device and usage information, such as your IP address, browser and device characteristics, operating system, language preferences, referring URLs, device name, country, location, information about how and when you use our Services, and other technical information. This information is primarily needed to maintain the security and operation of our Services, and for our internal analytics and reporting purposes.
                    </LegalParagraph>
                    <LegalParagraph>
                        Like many businesses, we also collect information through cookies and similar technologies.
                    </LegalParagraph>
                </>
            )
        },
        {
            id: "how-do-we-process-your-information",
            sectionNumber: 2,
            title: "How Do We Process Your Information?",
            content: (
                <>
                    <LegalParagraph>
                        <strong>In Short:</strong> <em>We process your information to provide, improve, and administer our Services, communicate with you, for security and fraud prevention, and to comply with law. We may also process your information for other purposes with your consent.</em>
                    </LegalParagraph>
                    <LegalParagraph>
                        <b>We process your personal information for a variety of reasons, depending on how you interact with our Services, including:</b>
                    </LegalParagraph>
                    <LegalList>
                        <LegalListItem><strong>To facilitate account creation and authentication and otherwise manage user accounts.</strong> We may process your information so you can create and log in to your account, as well as keep your account in working order.</LegalListItem>
                        <LegalListItem><strong>To deliver and facilitate delivery of services to the user.</strong> We may process your information to provide you with the requested service.</LegalListItem>
                        <LegalListItem><strong>To respond to user inquiries/offer support to users.</strong> We may process your information to respond to your inquiries and solve any potential issues you might have with the requested service.</LegalListItem>
                        <LegalListItem><strong>To protect our Services.</strong> We may process your information as part of our efforts to keep our Services safe and secure, including fraud monitoring and prevention.</LegalListItem>
                        <LegalListItem><strong>To evaluate and improve our Services and your experience.</strong> We may process your information when we believe it is necessary to identify usage trends, and to evaluate and improve our Services and your experience.</LegalListItem>
                    </LegalList>
                </>
            )
        },
        {
            id: "when-and-with-whom-do-we-share-your-personal-information",
            sectionNumber: 3,
            title: "When and With Whom Do We Share Your Personal Information?",
            content: (
                <>
                    <LegalParagraph>
                        <strong>In Short:</strong> <em> We may share information in specific situations described in this section and/or with the following third parties.</em>
                    </LegalParagraph>
                    <LegalParagraph>
                        We may need to share or transfer your personal information in connection with, or during negotiations of, any merger, sale of company assets, financing, or acquisition of all or a portion of our business to another company.
                    </LegalParagraph>
                </>
            )
        },
        {
            id: "do-we-use-cookies-and-other-tracking-technologies",
            sectionNumber: 4,
            title: "Do We Use Cookies and Other Tracking Technologies?",
            content: (
                <>
                    <LegalParagraph>
                        <strong>In short:</strong> <em>We may use cookies and other tracking technologies to collect and store your information.</em>
                    </LegalParagraph>
                    <LegalParagraph>
                        We may use cookies and similar tracking technologies (like web beacons and pixels) to gather information when you interact with our Services. Some online tracking technologies help us maintain the security of our Services, prevent crashes, fix bugs, save your preferences, and assist with basic site functions.
                    </LegalParagraph>
                    <LegalParagraph>
                        We also permit third parties and service providers to use online tracking technologies on our Services for analytics purposes, which helps us understand how you use the app so we can improve it. We do not use tracking technologies for advertising or promotional purposes.
                    </LegalParagraph>
                </>
            )
        },
        {
            id: "how-do-we-handle-your-social-logins",
            sectionNumber: 5,
            title: "How Do We Handle Your Social Logins?",
            content: (
                <>
                    <LegalParagraph>
                        <strong>In short:</strong> <em>If you choose to register or log in to our Services using a social media account, we may have access to certain information about you.</em>
                    </LegalParagraph>
                    <LegalParagraph>
                        Our Services offer you the ability to register and log in using your third-party social media account details (like your Google or Facebook logins). Where you choose to do this, we will receive certain profile information about you from your social media provider. The profile information we receive may vary depending on the social media provider concerned, but will often include your name, email address, friends list, and profile picture, as well as other information you choose to make public on such a social media platform.
                    </LegalParagraph>
                    <LegalParagraph>
                        We will use the information we receive only for the purposes that are described in this Privacy Policy or that are otherwise made clear to you on the relevant Services. Please note that we do not control, and are not responsible for, other uses of your personal information by your third-party social media provider. We recommend that you review their privacy policy to understand how they collect, use, and share your personal information, and how you can set your privacy preferences on their sites and apps.
                    </LegalParagraph>
                </>
            )
        },
        {
            id: "is-your-information-transferred-internationally",
            sectionNumber: 6,
            title: "Is Your Information Transferred Internationally?",
            content: (
                <>
                    <LegalParagraph>
                        <strong>In short:</strong> <em>We may transfer, store, and process your information in countries other than your own.</em>
                    </LegalParagraph>
                    <LegalParagraph>
                        Our servers are located in the United States. Regardless of your location, please be aware that your information may be transferred to, stored by, and processed by us in our facilities and in the facilities of the third parties with whom we may share your personal information (see "When and With Whom Do We Share Your Personal Information?" above), including facilities in the United States and other countries.
                    </LegalParagraph>
                    <LegalParagraph>
                        If you are a resident in the European Economic Area (EEA), United Kingdom (UK), or Switzerland, then these countries may not necessarily have data protection laws or other similar laws as comprehensive as those in your country. However, we will take all necessary measures to protect your personal information in accordance with this Privacy Policy and applicable law.
                    </LegalParagraph>
                </>
            )
        },
        {
            id: "how-long-do-we-keep-your-information",
            sectionNumber: 7,
            title: "How Long Do We Keep Your Information?",
            content: (
                <>
                    <LegalParagraph>
                        <strong>In short:</strong> <em>We keep your information for as long as necessary to fulfill the purposes outlined in this Privacy Policy unless otherwise required by law.</em>
                    </LegalParagraph>
                    <LegalParagraph>
                        We will only keep your personal information for as long as it is necessary for the purposes set out in this Privacy Policy, unless a longer retention period is required or permitted by law (such as tax, accounting, or other legal requirements).
                    </LegalParagraph>
                    <LegalParagraph>
                        When we have no ongoing legitimate business need to process your personal information, we will either delete or anonymize such information, or, if this is not possible (for example, because your personal information has been stored in backup archives), then we will securely store your personal information and isolate it from any further processing until deletion is possible.
                    </LegalParagraph>
                </>
            )
        },
        {
            id: "do-we-collect-information-from-minors",
            sectionNumber: 8,
            title: "Do We Collect Information From Minors?",
            content: (
                <>
                    <LegalParagraph>
                        <strong>In short:</strong> <em>We do not knowingly collect data from or market to children under 13 years of age.</em>
                    </LegalParagraph>
                    <LegalParagraph>
                        We do not knowingly collect, solicit data from, or market to children under 13 years of age, nor do we knowingly sell such personal information. By using the Services, you represent that you are at least 13 or that you are the parent or guardian of such a minor and consent to such minor dependent's use of the Services. If we learn that personal information from users less than 13 years of age has been collected, we will deactivate the account and take reasonable measures to promptly delete such data from our records. If you become aware of any data we may have collected from children under age 13, please contact us at {contactEmail}.
                    </LegalParagraph>
                </>
            )
        },
        {
            id: "what-are-your-privacy-rights",
            sectionNumber: 9,
            title: "What Are Your Privacy Rights?",
            content: (
                <>
                    <LegalParagraph>
                        <strong>In short: </strong> <em>You may review, change, or terminate your account at any time, depending on your country, province, or state of residence.</em>
                    </LegalParagraph>
                    <LegalParagraph>
                        <strong><u>Withdrawing your consent:</u></strong> If we are relying on your consent to process your personal information, which may be express and/or implied consent depending on the applicable law, you have the right to withdraw your consent at any time. You can withdraw your consent at any time by contacting us by using the contact details provided in the section "How Can You Contact Us About This Policy?" below.
                    </LegalParagraph>
                    <LegalParagraph>
                        However, please note that this will not affect the lawfulness of the processing before its withdrawal nor, when applicable law allows, will it affect the processing of your personal information conducted in reliance on lawful processing grounds other than consent.
                    </LegalParagraph>
                    <LegalHeading>Account information</LegalHeading>
                    <LegalParagraph>
                        If you would at any time like to review or change the information in your account or terminate your account, you can:
                    </LegalParagraph>
                    <LegalList>
                        <LegalListItem>Sign in to your account settings to review and update your profile information, such as your display name, email address, and profile picture.</LegalListItem>
                        <LegalListItem>Sign in to your account settings to review and update your security settings, such as your password.</LegalListItem>
                        <LegalListItem>Sign in to your account settings to permanently delete your account and all associated data.</LegalListItem>
                        <LegalListItem>Contact us using the contact information provided to request data modifications or account deletion.</LegalListItem>
                    </LegalList>
                    <LegalParagraph>
                        Upon your request to terminate your account, we will deactivate or delete your account and information from our active databases. However, we may retain some information in our files to prevent fraud, troubleshoot problems, assist with any investigations, enforce our legal terms and/or comply with applicable legal requirements.
                    </LegalParagraph>
                </>
            )
        },
        {
            id: "controls-for-do-not-track-features",
            sectionNumber: 10,
            title: "Controls for Do-Not-Track Features",
            content: (
                <>
                    <LegalParagraph>
                        Most web browsers and some mobile operating systems and mobile applications include a Do-Not-Track ("DNT") feature or setting you can activate to signal your privacy preference not to have data about your online browsing activities monitored and collected. At this stage, no uniform technology standard for recognizing and implementing DNT signals has been finalized. As such, we do not currently respond to DNT browser signals or any other mechanism that automatically communicates your choice not to be tracked online. If a standard for online tracking is adopted that we must follow in the future, we will inform you about that practice in a revised version of this Privacy Policy.
                    </LegalParagraph>
                </>
            )
        },
        {
            id: "do-we-make-updates-to-this-policy",
            sectionNumber: 11,
            title: "Do We Make Updates to This Policy?",
            content: (
                <>
                    <LegalParagraph>
                        <strong>In short:</strong> <em>Yes, we will update this policy as necessary to stay compliant with relevant laws.</em>
                    </LegalParagraph>
                    <LegalParagraph>
                        We may update this Privacy Policy from time to time. The updated version will be indicated by an updated "Revised" date at the top of this Privacy Policy. If we make material changes to this Privacy Policy, we may notify you either by prominently posting a notice of such changes or by directly sending you a notification. We encourage you to review this Privacy Policy frequently to be informed of how we are protecting your information.
                    </LegalParagraph>
                </>
            )
        },
        {
            id: "how-can-you-contact-us-about-this-policy",
            sectionNumber: 12,
            title: "How Can You Contact Us About This Policy?",
            content: (
                <>
                    <LegalParagraph>
                        If you have questions or comments about this policy, you may email us at {contactEmail}, or by filling out the <a href="https://trackmate.co/contact" className="font-semibold underline">contact form</a> on our website.
                    </LegalParagraph>
                </>
            )
        },
        {
            id: "how-can-you-review-update-or-delete-the-data-we-collect-from-you",
            sectionNumber: 13,
            title: "How Can You Review, Update, or Delete the Data We Collect From You?",
            content: (
                <>
                    <LegalParagraph>
                        Based on the applicable laws of your country, you may have the right to request access to the personal information we collect from you, details about how we have processed it, correct inaccuracies, or delete your personal information. You may also have the right to withdraw your consent to our processing of your personal information. These rights may be limited in some circumstances by applicable law. To request to review, update, or delete your personal information, please email us at {contactEmail} or submit a request through our <a href="https://trackmate.co/contact" className="font-semibold underline">contact form</a>.
                    </LegalParagraph>
                </>
            )
        },
    ]

    return (
        <div id="privacy-container" className="min-h-dvh flex flex-col items-center px-4 py-8 lg:px-6">
            <Header>
                <TrackMateLogo size={50} showBackground={false} crop className="lg:ml-8 cursor-pointer" />
            </Header>

            <main className="flex-1 flex flex-col max-w-7xl w-full mt-12 mb-12" style={{ color: LANDING.TEXT_PRIMARY }}>
                <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
                <p className="ml-2 mb-8" style={{ color: LANDING.TEXT_SECONDARY }}>
                    Last Updated: June 11, 2026
                </p>

                <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start w-full">
                    <LegalTableOfContents sections={privacyData} />

                    <div
                        className="flex-1 text-sm lg:text-base leading-relaxed"
                        style={{ color: LANDING.TEXT_SECONDARY }}
                    >
                        {privacyData.map((section) => (
                            <LegalSection
                                key={section.id}
                                id={section.id}
                                sectionNumber={section.sectionNumber}
                                title={section.title}
                            >
                                {section.content}
                            </LegalSection>
                        ))}
                    </div>
                </div>
            </main>

            <Footer>
                © {new Date().getFullYear()} {BRAND_NAME}. All rights reserved.
            </Footer>
        </div>
    )
}

export default PrivacyPolicy
