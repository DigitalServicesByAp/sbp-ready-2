export type Bank = {
  name: string
  short: string
  category: 'Islamic' | 'Conventional' | 'Public' | 'Foreign' | 'Specialized'
  color: string
  logo?: string
  cardImage?: string
  popular?: boolean
}

// Educational dataset of banks operating in Pakistan.
// Real logos are stored locally in /public/logos for reliability; banks
// without a stored logo fall back to a branded monogram tile.
export const banks: Bank[] = [
  { name: 'HBL', short: 'HB', category: 'Conventional', color: '#0a8a3f', logo: '/logos/hbl.png', cardImage: 'https://cdn.corenexis.com/f/KUIhqiMpmJh.png', popular: true },
  { name: 'UBL', short: 'UB', category: 'Conventional', color: '#0057a8', logo: '/logos/ubl.png', cardImage: 'https://cdn.corenexis.com/f/wKKa5AbhYmu.png', popular: true },
  { name: 'MCB Bank', short: 'MC', category: 'Conventional', color: '#12703a', logo: '/logos/mcb-bank.png', cardImage: 'https://cdn.corenexis.com/f/V0em3iXx06T.png', popular: true },
  { name: 'Bank Alfalah', short: 'AF', category: 'Conventional', color: '#c8102e', logo: '/logos/bank-alfalah.png', cardImage: 'https://cdn.corenexis.com/f/V0em3iXx06T.png', popular: true },
  { name: 'Meezan Bank', short: 'MZ', category: 'Islamic', color: '#0e7a6b', logo: '/logos/meezan-bank.png', cardImage: 'https://cdn.corenexis.com/f/4MuLEOKfvLN.png', popular: true },
  { name: 'Allied Bank', short: 'AB', category: 'Conventional', color: '#1b3a6b', logo: '/logos/allied-bank.png', cardImage: 'https://cdn.corenexis.com/f/FhSnr6doBOZ.png' },
  { name: 'National Bank', short: 'NB', category: 'Public', color: '#8a1f2b', logo: '/logos/national-bank.png', cardImage: 'https://cdn.corenexis.com/f/149auVlWzbn.png' },
  { name: 'Askari Bank', short: 'AK', category: 'Conventional', color: '#b3202f', logo: '/logos/askari-bank.png', cardImage: 'https://cdn.corenexis.com/f/79SOyxgdO3B.png' },
  { name: 'Bank of Punjab', short: 'BP', category: 'Public', color: '#0062b0', logo: '/logos/bank-of-punjab.png', cardImage: 'https://cdn.corenexis.com/f/ajBWH0wDwKt.png' },
  { name: 'ZTBL', short: 'ZT', category: 'Specialized', color: '#137a3a', logo: '/logos/ztbl.png', cardImage: 'https://cdn.corenexis.com/f/c69Tk4svIQm.png' },
  { name: 'Standard Chartered', short: 'SC', category: 'Foreign', color: '#0a7d64', logo: '/logos/standard-chartered.png', cardImage: 'https://cdn.corenexis.com/f/OfuTVcXqT29.png' },
  { name: 'Bank Makramah', short: 'MK', category: 'Conventional', color: '#12559c', logo: '/logos/bank-makramah.png', cardImage: 'https://cdn.corenexis.com/f/38vyKfOsztI.png' },
  { name: 'Habib Metro', short: 'HM', category: 'Conventional', color: '#12447d', logo: '/logos/habib-metro.png', cardImage: 'https://cdn.corenexis.com/f/hytdYUWEWCY.png' },
  { name: 'Soneri Bank', short: 'SB', category: 'Conventional', color: '#c0392b', logo: '/logos/soneri-bank.png', cardImage: 'https://cdn.corenexis.com/f/gu0QSwsvaDO.png' },
  { name: 'JS Bank', short: 'JS', category: 'Conventional', color: '#0f6e63', logo: '/logos/js-bank.png', cardImage: 'https://cdn.corenexis.com/f/g25avu5vZbf.png' },
  { name: 'Bank of Khyber', short: 'KB', category: 'Public', color: '#0f7a3d', logo: '/logos/bank-of-khyber.png', cardImage: 'https://cdn.corenexis.com/f/LKMNPLuFZci.png' },
  { name: 'First Women Bank', short: 'FW', category: 'Public', color: '#7a2f7a', logo: '/logos/first-women-bank.png', cardImage: 'https://cdn.corenexis.com/f/RiCYJ8DDwGQ.png' },
  { name: 'Sindh Bank', short: 'SD', category: 'Public', color: '#158043', logo: '/logos/sindh-bank.png', cardImage: 'https://cdn.corenexis.com/f/SK1AMPLMa0o.png' },
  { name: 'Dubai Islamic', short: 'DI', category: 'Islamic', color: '#0e6a3a', logo: '/logos/dubai-islamic.png', cardImage: 'https://cdn.corenexis.com/f/Bfv5p79xtYK.png' },
  { name: 'Faysal Bank', short: 'FB', category: 'Islamic', color: '#0d7a4f', logo: '/logos/faysal-bank.png', cardImage: 'https://cdn.corenexis.com/f/Bfv5p79xtYK.png' },
  { name: 'Saudi Pak', short: 'SP', category: 'Specialized', color: '#146b3a', logo: '/logos/saudi-pak.jpg', cardImage: 'https://cdn.corenexis.com/f/3KRBIb1dPr9.png' },
  { name: 'Silk Bank', short: 'SK', category: 'Conventional', color: '#d4762a', logo: '/logos/silk-bank.png', cardImage: 'https://cdn.corenexis.com/f/HNnxV6TX9BL.png' },
  { name: 'Tameer Bank', short: 'TB', category: 'Specialized', color: '#d98324', logo: '/logos/tameer-bank.png', cardImage: 'https://cdn.corenexis.com/f/beTFDtSteqE.png' },
  { name: 'MUFG Bank', short: 'MU', category: 'Foreign', color: '#a11d2b', cardImage: 'https://cdn.corenexis.com/f/odILvWVjNxU.png' },
  { name: 'ICBC', short: 'IC', category: 'Foreign', color: '#b3202f', logo: '/logos/icbc.png', cardImage: 'https://cdn.corenexis.com/f/hfMbAghjLZg.png' },
  { name: 'Mizuho Bank', short: 'MI', category: 'Foreign', color: '#0f4c9c', logo: '/logos/mizuho-bank.png', cardImage: 'https://cdn.corenexis.com/f/u4NQLt2aam9.png' },
  { name: 'China Construction', short: 'CC', category: 'Foreign', color: '#12559c', logo: '/logos/china-construction.png', cardImage: 'https://cdn.corenexis.com/f/cjLRcAnsEUi.png' },
  { name: 'Bank Islami', short: 'BI', category: 'Islamic', color: '#0e7a4a', logo: '/logos/bank-islami.png', cardImage: 'https://cdn.corenexis.com/f/qCFYADvFIio.png' },
  { name: 'Woori Bank', short: 'WB', category: 'Foreign', color: '#0f5fa8', logo: '/logos/woori-bank.png', cardImage: 'https://cdn.corenexis.com/f/sH7k4ImFAv2.png' },
  { name: 'NIB Bank', short: 'NI', category: 'Conventional', color: '#d4762a', logo: '/logos/nib-bank.png', cardImage: 'https://cdn.corenexis.com/f/mMj637V5j0v.png' },
  { name: 'HSBC', short: 'HS', category: 'Foreign', color: '#b3202f', logo: '/logos/hsbc.png', cardImage: 'https://cdn.corenexis.com/f/lKEBzzaXm3t.png' },
  { name: 'Credit Agricole', short: 'CA', category: 'Foreign', color: '#12703a', logo: '/logos/credit-agricole.png', cardImage: 'https://cdn.corenexis.com/f/qJX1N6Er3DM.png' },
  { name: 'Al Baraka', short: 'AL', category: 'Islamic', color: '#0e7a6b', logo: '/logos/al-baraka.png', cardImage: 'https://cdn.corenexis.com/f/0Nk4WVjPjws.png' },
  { name: 'QIB (Qatar)', short: 'QI', category: 'Islamic', color: '#7a2f5a', logo: '/logos/qib-qatar.png', cardImage: 'https://cdn.corenexis.com/f/WD0lsTgXCRa.png' },
]

export const popularBanks = banks.filter((b) => b.popular)

// Convert a bank name into a URL-safe slug, e.g. "MCB Bank" -> "mcb-bank".
export function bankSlug(name: string) {
  return name
    .toLowerCase()
    .replace(/[()]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export function getBankBySlug(slug: string) {
  return banks.find((b) => bankSlug(b.name) === slug)
}

export type Category = Bank['category']

export const categories: Category[] = [
  'Conventional',
  'Islamic',
  'Public',
  'Foreign',
  'Specialized',
]

// Tailwind utility classes per category for consistent color-coded badges.
export const categoryStyles: Record<Category, string> = {
  Conventional:
    'bg-primary/10 text-primary ring-1 ring-inset ring-primary/20',
  Islamic:
    'bg-emerald-500/10 text-emerald-600 ring-1 ring-inset ring-emerald-500/20 dark:text-emerald-400',
  Public:
    'bg-blue-500/10 text-blue-600 ring-1 ring-inset ring-blue-500/20 dark:text-blue-400',
  Foreign:
    'bg-purple-500/10 text-purple-600 ring-1 ring-inset ring-purple-500/20 dark:text-purple-400',
  Specialized:
    'bg-accent/20 text-accent-foreground ring-1 ring-inset ring-accent/30 dark:text-accent',
}

export function countByCategory(category: Category) {
  return banks.filter((b) => b.category === category).length
}
