import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  return createBrowserClient(
    'https://ucfwnhhdxqhudfbgypwx.supabase.co',
    'sb_publishable_UQJIoVi80DWxjtqfq5E9mw_0_5TP3hc'
  )
}
