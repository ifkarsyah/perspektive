// Pre-generated Thorsten clips (scripts/generate_audio.py) are used when available;
// otherwise the browser's German voice reads the text.
let manifest: Record<string, string> = {}
let germanVoice: SpeechSynthesisVoice | undefined
let current: HTMLAudioElement | undefined

const AUDIO_DIR = `${import.meta.env.BASE_URL}audio/`

fetch(`${AUDIO_DIR}manifest.json`)
  .then((res) => (res.ok ? res.json() : {}))
  .then((data: Record<string, string>) => {
    manifest = data
  })
  .catch(() => {})

const pickVoice = () => {
  germanVoice = speechSynthesis.getVoices().find((v) => v.lang.startsWith('de'))
}

if (typeof speechSynthesis !== 'undefined') {
  pickVoice()
  speechSynthesis.addEventListener('voiceschanged', pickVoice)
}

// Blanks like "___" are read as a pause instead of "underscore".
function speakWithBrowser(text: string) {
  if (typeof speechSynthesis === 'undefined') return
  speechSynthesis.cancel()
  const utterance = new SpeechSynthesisUtterance(text.replace(/_+/g, '…'))
  utterance.lang = 'de-DE'
  if (germanVoice) utterance.voice = germanVoice
  speechSynthesis.speak(utterance)
}

export function speak(text: string) {
  current?.pause()
  const file = manifest[text]
  if (!file) {
    speakWithBrowser(text)
    return
  }
  current = new Audio(AUDIO_DIR + file)
  current.play().catch(() => speakWithBrowser(text))
}
