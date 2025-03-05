import { ScrollView, View, Text, Alert, TouchableOpacity, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "../components/CustomButton";
import { useState, useEffect } from "react";
import icons from "../../constants/icons";
import { router } from "expo-router";
import { useGlobalContext } from "../../context/GlobalProvider";
import { register } from "../lib/pulse-services";

const TermsAndConditions = () => {
    const [terms, setTerms] = useState(null)
    const { signUpFormData } = useGlobalContext()

    useEffect(() => {
        const handleTerms = async () => {
            if (signUpFormData) {
                console.log("Form Data:", signUpFormData);
            }

            if (terms) {

                await register(signUpFormData);

                router.replace('/home')

            } else if (terms == false) {

                setTerms(null)
                // show an alert
                Alert.alert(
                    "Terms and Conditions Required",
                    "You must accept the Terms and Conditions to proceed. " +
                    "Please review the terms and accept them to complete the registration.");
            }
        }

        handleTerms();
    }, [signUpFormData, terms]);

    const renderTermsText = () => { return terms ? "Yes" : "No" }
    const renderAcceptButtonColor = () => { return terms ? "bg-green" : "" }
    const renderRejectButtonColor = () => { return !terms ? "bg-red" : "" }

    return (
        <SafeAreaView className='w-full h-full bg-primary px-5 '>
            <TouchableOpacity className='pl-5 mt-7' onPress={() => router.back()}>
                    <Image
                        className='w-[25px] h-[25px]'
                        source={icons.leftArrow}
                        resizeMode="contain"
                    />
                </TouchableOpacity>
            <ScrollView>
                <View className='w-full h-full items-center justify-center mt-[20px]'>
                    <Text className='text-white text-base font-psemibold text-2xl'>
                        Terms and Condition
                    </Text>
                    <Text className='text-gray-200 text-base font-pregular text-1xl mt-[32px]'>
                        Consent to Messages. When you use the pulse, you may be given the opportunity to consent to receive communications from us through email, text, and/or mobile push notifications. Standard text and calling rates will apply. You agree that texts, calls or prerecorded messages may be generated by automatic telephone dialing systems. You can opt out of promotional communications by following the “Unsubscribe” directions for emails, through the settings of the pulse Product, or, if via text message, by responding STOP.

                        App Permissions. When you use the pulse Products, you may grant certain permissions to us for your device and/or accounts. Most mobile device platforms provide additional information regarding these permissions and how, if possible, to changes your permission settings. By downloading, installing or using the Pulse Products, you agree to receive automatic software updates (as applicable).
                        Commercial, Marketing, or Branding Use Prohibited. Except as expressly licensed, we do not allow uses of the Pulse Products, or other pulse intellectual property, that are commercial or business-related, including uses in marketing or branding, or that advertise or offer to sell or promote products or services (whether or not for profit), or that solicit others (including solicitations for contributions or donations).
                        The Order Process. You will have the opportunity to review and confirm your order, including delivery address (if applicable), payment method and product details. We will send to you a notice when we accept your order and our acceptance will be deemed complete and for all purposes to have been effectively communicated to you at the time we send the notice. At such time, the contract for sale will be made and become binding on both you and us. The risk of loss in any goods you purchase and the responsibility to insure them passes to you when the relevant goods are delivered.
                        We reserve the right to refuse or cancel any order prior to delivery. Some situations that may result in your order being cancelled include system or typographical errors, inaccuracies in product or pricing information or product availability, fairness among customers where supplies are limited, or problems identified by our credit or fraud departments. We also may require additional verification or information before accepting an order. We will contact you if any portion of your order is cancelled or if additional information is required to accept your order. If your order is cancelled after we have processed your payment but prior to delivery, we will refund your payment.
                        Payments and Billing. When you provide payment information, you represent and warrant that the information is accurate, that you are authorized to use the payment method provided, and that you will notify us of changes to the payment information. We reserve the right to utilize third party payment card updating services to obtain current expiration dates on credit cards and debit cards.
                    </Text>

                    <Text className='text-gray-200 text-base font-pregular text-1xl mt-[32px]'>
                        Disclaimers and Limitation on Liability
                        THE DISNEY PRODUCTS ARE PROVIDED “AS IS” AND “AS AVAILABLE.” WE DISCLAIM ALL CONDITIONS, REPRESENTATIONS AND WARRANTIES NOT EXPRESSLY SET OUT IN THESE TERMS TO THE FULLEST EXTENT PERMITTED BY LAW.
                        PLEASE REFER TO THE HELP SECTION OF THE APPLICABLE DISNEY PRODUCT FOR ASSISTANCE IF A PULSE PRODUCT IS NOT WORKING PROPERLY. It is your responsibility to ensure you follow installation instructions, have the minimum system requirements, update software as recommended, and consult our customer service resources if you encounter a problem with the pulse Products.
                        We shall not be liable for delay or failure in performance for causes beyond our control or any other damage which does not result from a breach of our obligations under this Agreement.
                        We are not liable for business losses. We only supply products for your personal, noncommercial, and domestic use. If you use the products for any other purpose we will have no liability to you for any loss of profit, loss of business, business interruption, loss of business opportunity, or similar loss.
                        WE ARE NOT RESPONSIBLE FOR ANY LACK OF FUNCTIONALITY OR FAILURE TO PROVIDE ANY PART OF THE DISNEY PRODUCT(S), OR ANY LOSS OF CONTENT OR DATA THAT IS DUE TO: YOUR EQUIPMENT, DEVICES, OPERATING SYSTEM OR INTERNET CONNECTION; OR YOUR FAILURE TO COMPLY WITH SPECIFIED COMPATIBILITY REQUIREMENTS.
                        WE SHALL NOT BE LIABLE TO YOU FOR INDIRECT, INCIDENTAL, SPECIAL OR CONSEQUENTIAL DAMAGES, INCLUDING LOST PROFITS AND PROPERTY DAMAGE, EVEN IF WE WERE ADVISED OF THE POSSIBILITY OF SUCH DAMAGES, NOR SHALL WE BE HELD LIABLE FOR DELAY OR FAILURE IN PERFORMANCE RESULTING FROM CAUSES BEYOND OUR REASONABLE CONTROL.
                        IN NO EVENT SHALL OUR TOTAL LIABILITY TO YOU FOR ALL DAMAGES, LOSSES AND CAUSES OF ACTION EXCEED ONE THOUSAND U.S. DOLLARS (US $1,000).
                        Submissions and Unsolicited Ideas Policies. Our long-standing company policy does not allow us to accept or consider unsolicited creative ideas, suggestions or materials. In connection with anything you submit to us – whether or not solicited by us – you agree that creative ideas, suggestions or other materials you submit are not being made in confidence or trust and that no confidential or fiduciary relationship is intended or created between you and us in any way, and that you have no expectation of review, compensation or consideration of any type.
                    </Text>

                    <Text className='text-gray-200 text-base font-pregular text-1xl mt-[32px]'>
                        B. User Generated Content. The pulse Products may ask for or allow you to communicate, submit, upload or otherwise make available text, chats, images, audio, video, contest entries or other content (“User Generated Content”), which may be accessible and viewable by the public. Access to these features may be subject to age restrictions. Whether a Disney Product made available by us or in connection with pulse Products appears on a pulse website, service and/or platform or is integrated with a third-party website, service, application, and/or platform, you may not submit or upload User Generated Content that is defamatory, harassing, threatening, bigoted, hateful, violent, vulgar, obscene, pornographic, or otherwise offensive or that harms or can reasonably be expected to harm any person or entity, whether or not such material is protected by law.
                        In most instances, we do not claim ownership of your User Generated Content; however, you grant us a non-exclusive, sublicensable, irrevocable and royalty-free worldwide license under all copyrights, trademarks, patents, trade secrets, privacy and publicity rights and other intellectual property rights for the full duration of those rights to use, reproduce, transmit, print, publish, publicly display, exhibit, distribute, redistribute, copy, index, comment on, modify, transform, adapt, translate, create derivative works based upon, publicly perform, publicly communicate, make available, and otherwise exploit such User Generated Content, in whole or in part, in all media formats and channels now known or hereafter devised (including in connection with the pulse Products and on third-party websites, services, applications, and/or platforms), in any number of copies and without limit as to time, manner and frequency of use, without further notice to you, without attribution (to the extent this is not contrary to mandatory provisions of applicable law), and without the requirement of permission from or payment to you or any other person or entity. You agree that submission of User Generated Content does not establish any relationship of trust and confidence between you and us, and that you have no expectation of compensation whatsoever (except as may be specifically stated in the provisions of the pulse Products in connection with the submission, or arising from it).
                        You represent and warrant that your User Generated Content conforms to this Agreement and that you own or have the necessary rights and permissions including, without limitation, all copyrights, music rights and likeness rights (with respect to any person) contained in the User Generated Content, without the need for payment to any other person or entity, to use and exploit, and to authorize us to use and exploit, your User Generated Content in all manners contemplated by this Agreement; and you agree to indemnify and hold us harmless from any claims or expenses (including attorneys’ fees) by any third party arising out of or in connection with our use and exploitation of your User Generated Content resulting from your breach of this Agreement. You also agree to waive and not to enforce any moral rights, ancillary rights or similar rights in or to the User Generated Content against us or our licensees, distributors, agents, representatives and other authorized users, and agree to procure the same agreement to waive and not to enforce from others who may possess such rights.
                        To the extent that we authorize you to create, post, upload, distribute, publicly display or publicly perform User Generated Content that requires the use of our copyrighted works, we grant you a non-exclusive license to create a derivative work using the specifically referenced copyrighted works as required for the sole purpose of creating such a work, provided that such license shall be conditioned upon your assignment to us of all rights worldwide in the work you create for the duration of copyright in the User Generated Content, in all formats and media known or unknown to date, including for use on pulse Products and on third party sites and platforms. If such rights are not assigned to us, your license to create derivative works using our copyrighted works shall be null and void.
                        We may monitor, screen, post, remove, modify, store and review User Generated Content or communications sent through a pulse Product, at any time and for any reason, including to ensure that the User Generated Content or communication conforms to this Agreement, without prior notice to you. We may terminate your account and access to the pulse Products if your User Generated Content violates this Agreement, including unlawful postings or content, without prior notice to you. We are not responsible for, and do not endorse or guarantee, the opinions, views, advice or recommendations posted or sent by users
                    </Text>


                    <Text className='text-gray-200 text-base font-pregular text-1xl mt-[32px]'>
                        9. Additional Provisions
                    </Text>


                    <Text className='text-gray-200 text-base font-pregular text-1xl mt-[32px]'>
                        A. Choice of Forum. You agree that any action at law or in equity arising out of or relating to this Agreement that is not subject to arbitration shall be filed, and that venue properly lies, only in the state or federal courts located in either Los Angeles, California or the borough of Manhattan, New York, New York, United States of America and you consent and submit to the personal jurisdiction of such courts for the purposes of litigating such action.
                    </Text>
                    <Text className='text-gray-200 text-base font-pregular text-1xl mt-[32px]'>
                        B. Choice of Law. This Agreement is governed by and construed in accordance with the laws of the State of New York and the laws of the United States, without giving effect to any conflict of law principles.
                    </Text>
                    <Text className='text-gray-200 text-base font-pregular text-1xl mt-[32px]'>
                        C. Severability. If any provision of this Agreement shall be unlawful, void or for any reason unenforceable, then that provision shall be deemed severable from this Agreement and shall not affect the validity and enforceability of any remaining provisions.
                    </Text>
                    <Text className='text-gray-200 text-base font-pregular text-1xl mt-[32px]'>
                        D. Survival. The provisions of this Agreement which by their nature should survive the termination of this Agreement shall survive such termination, including but not limited to the restrictions, disclaimers, limitations, our rights to use submitted content, and rules regarding dispute resolution in Section 2, 3, 6, 7 and 8 as well as the general provisions in this Section 9.
                    </Text>
                    <Text className='text-gray-200 text-base font-pregular text-1xl mt-[32px]'>
                        E. Waiver. No waiver of any provision of this Agreement by us shall be deemed a further or continuing waiver of such provision or any other provision, and our failure to assert any right or provision under this Agreement shall not constitute a waiver of such right or provision.D. Survival. The provisions of this Agreement which by their nature should survive the termination of this Agreement shall survive such termination, including but not limited to the restrictions, disclaimers, limitations, our rights to use submitted content, and rules regarding dispute resolution in Section 2, 3, 6, 7 and 8 as well as the general provisions in this Section 9.
                    </Text>

                    <Text className='text-gray-200 text-base font-pregular text-1xl mt-[32px]'>
                        Accept Terms: {renderTermsText()}
                    </Text>

                    <View className='w-full flex-row justify-between mb-[70px]' >
                        <View>
                            <CustomButton
                                title='Accept'
                                containerStyle={`w-[40vw] mt-10 ${renderAcceptButtonColor()}`}
                                handlePress={() => setTerms(true)}
                            />
                        </View>
                        <View>
                            <CustomButton
                                title='Reject'
                                containerStyle={`w-[40vw] mt-10 ${renderRejectButtonColor()}`}
                                handlePress={() => setTerms(false)}
                            />
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )

}

export default TermsAndConditions;