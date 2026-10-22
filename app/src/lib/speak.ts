let germanVoice: SpeechSynthesisVoice | undefined

const pickVoice = () => {
  germanVoice = speechSynthesis.getVoices().find((v) => v.lang.startsWith('de'))
}

if (typeof speechSynthesis !== 'undefined') {
  pickVoice()
  speechSynthesis.addEventListener('voiceschanged', pickVoice)
}

// Blanks like "___" are read as a pause instead of "underscore".
export function speak(text: string) {
  if (typeof speechSynthesis === 'undefined') return
  speechSynthesis.cancel()
  const utterance = new SpeechSynthesisUtterance(text.replace(/_+/g, '…'))
  utterance.lang = 'de-DE'
  if (germanVoice) utterance.voice = germanVoice
  speechSynthesis.speak(utterance)
}
