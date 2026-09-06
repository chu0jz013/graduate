/**
 * Copy text to the clipboard.
 *
 * The async Clipboard API needs a secure context, which a phone opening the
 * card over https always has — but the execCommand path keeps it working on
 * plain-http previews and older in-app browsers (Zalo's and Messenger's
 * built-in webviews are the ones that matter here).
 */
export async function copyText(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text)
      return true
    }
  } catch {
    // fall through to the legacy path
  }

  try {
    const area = document.createElement('textarea')
    area.value = text
    area.setAttribute('readonly', '')
    area.style.position = 'fixed'
    area.style.opacity = '0'
    document.body.append(area)
    area.select()
    const ok = document.execCommand('copy')
    area.remove()
    return ok
  } catch {
    return false
  }
}
