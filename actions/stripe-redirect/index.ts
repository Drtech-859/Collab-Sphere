"use server"

import { auth, currentUser } from "@clerk/nextjs"
import { InputType, ReturnType } from "./types"
import { StripeRedirect } from "./schema"

import { db } from "@/lib/db"
import { createSafeAction } from "@/lib/create-safe-action"

import { absoluteUrl } from "@/lib/utils"
import { stripe } from "@/lib/stripe"
import { revalidatePath } from "next/cache"


const handler = async (data: InputType): Promise<ReturnType> => {
    const { userId, orgId } = auth()
    const  User = await currentUser()

    if (!userId || !orgId || !User) {
        return {
            error: "Unauthorized"
        }
    }


    const settingsUrl = absoluteUrl(`/organization/${orgId}`)
    let url = ""

    try {
        const orgSubscription = await db.orgSubscription.findUnique({
            where: {
                orgId
            }
        })

        if (orgSubscription && orgSubscription.stripeCustomerId) {
            const stripeSession = await stripe.billingPortal.sessions.create({
                customer: orgSubscription.stripeCustomerId,
                return_url: settingsUrl
            })

            url = stripeSession.url
        }else{
            const stripeSession = await stripe.checkout.sessions.create({
                success_url : settingsUrl,
                cancel_url : settingsUrl,
                payment_method_types:["card"],
                mode:"subscription",
                billing_address_collection:"auto",
                customer_email : User.emailAddresses[0].emailAddress,
                line_items:[
                    {
                        price_data : {
                            currency : "USD",
                            product_data : {
                                name : "Collabsphere Pro",
                                description : "Unlimited boards for your organization"
                            },
                            unit_amount:500,
                            recurring:{
                                interval : "month"
                            }
                        },
                        quantity : 1
                    }
                ],
                metadata : {
                    orgId,
                }
            })

            url = stripeSession.url || ""
        }

    } catch(error){
        return{
            error : `${error}`
        }
    }

    revalidatePath(`/organization/${orgId}`)
    return {data:url};

}

export const stripeRedirect = createSafeAction(StripeRedirect, handler)