import { useEffect, useState } from 'react'

//  These are GPT generated i can't be asked
//  It ain't that deep

const fallbackNames = [
  'BlueFalcon', 'SilentShadow', 'QuantumToast', 'NebulaNomad',
  'PixelPirate', 'CrimsonWolf', 'VoidScribe', 'GlitchGoblin',
  'StormRider', 'CodeNinja', 'MysticByte', 'ElectricEcho',
  'ShadowCoder', 'CosmicDrifter', 'DigitalPhoenix', 'TurboGhost',
  'CyberWanderer', 'NeonSamurai', 'ByteBandit', 'ArcaneHacker',
  'ThunderBolt', 'DarkMatter', 'FlashViper', 'IronWizard',
  'SpectralKnight', 'LaserLynx', 'PulseHunter', 'VortexMage'
]

function getRandomName() {
  return fallbackNames[Math.floor(Math.random() * fallbackNames.length)]
}

export default function useUsername() {
  const [username, setUsername] = useState('')

  useEffect(() => {
    const stored = localStorage.getItem('username')
    if (stored) {
      setUsername(stored)
    } else {
      const random = getRandomName()
      localStorage.setItem('username', random)
      setUsername(random)
    }
  }, [])

  const updateUsername = (newName: string) => {
    localStorage.setItem('username', newName)
    setUsername(newName)
  }

  return { username, updateUsername }
}
