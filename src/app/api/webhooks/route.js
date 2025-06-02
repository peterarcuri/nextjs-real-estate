import { verifyWebhook } from '@clerk/nextjs/webhooks'
import { NextRequest } from 'next/server'

export async function POST(req) {
  try {
    const evt = await verifyWebhook(req)

    // Do something with payload
    // For this guide, log payload to console
    const { id } = evt?.data
    const eventType = evt?.type

    if(eventType === 'user.created' || evt.type === 'user.updated') {
      const { firstName, lastName, image_url, email_addresses } = evt?.data;

      try {
        const user = await createOrUpdateUser(
            id,
            firstName,
            lastName,
            image_url,
            email_addresses
        );
        if (user && eventType === 'user.created') {
            try {
                await clerkClient.user.updateUserMetadata(id, {
                    publicMetadata: {
                        userMogoId: user._id,
                    },
                }
                );
            } catch (error) {
                console.log('Error: Could not update user metadata', error);
                return new Response('Error deleting user', {
                    status: 400,
                })
            }
        }

        if (eventType === 'user.deleted') {
            try {
                await deleteUser(id);
            } catch (error) {
                console.log('Error: Could not delete user', error);
                return new Response('Error deleting user', {
                    status: 400,
                })
            }
        }

      } catch (error) {
        console.log('Error: Could not create or update user', error);
      }

      return new Response('Webhook received', { status: 200 });
      
    }



    return new Response('Webhook received', { status: 200 })
  } catch (err) {
    console.error('Error verifying webhook:', err)
    return new Response('Error verifying webhook', { status: 400 })
  }
}