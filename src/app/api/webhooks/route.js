import { verifyWebhook } from '@clerk/nextjs/webhooks'
import { NextRequest } from 'next/server'

export async function POST(req) {
  try {
    const evt = await verifyWebhook(req)

    // Do something with payload
    // For this guide, log payload to console
    const { id } = evt.data
    const eventType = evt.type

    if(evt.type === 'user.created') {
      console.log('User.created')
    }

    if(evt.type === 'user.updated') {
        console.log('User.updated')
      }

    if(evt.type === 'user.deleted') {
        console.log('User.deleted')
      }

    return new Response('Webhook received', { status: 200 })
  } catch (err) {
    console.error('Error verifying webhook:', err)
    return new Response('Error verifying webhook', { status: 400 })
  }
}