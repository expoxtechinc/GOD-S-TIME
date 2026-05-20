import { Quote } from '../types';

export const QUOTE_CATEGORIES = [
  'Faith & Trust',
  'Hope & Healing',
  'Purpose & Calling',
  'Overcoming Fear',
  'Strength & Courage',
  'Love & Forgiveness',
  'Peace & Rest',
  'Success & Discipline',
  'Family & Relationships',
  'Grief & Loss',
  'Gratitude & Joy',
  'Prayer & Worship',
  'Africa & Heritage',
  'Youth & Identity',
  'Financial Wisdom',
  'Mental Health'
];

export const STATIC_QUOTES: Quote[] = [
  {
    id: 'q1',
    text: 'He who has God has everything. Wait patiently on His calendar, for the clock of heaven is never slow.',
    author: 'Akin S. Sokpah',
    category: 'Faith & Trust',
    type: 'Original'
  },
  {
    id: 'q2',
    text: 'Africa will rise on its knees. When we pray in our native tongues from Monrovia to Cape Town, the heavens open.',
    author: 'Bishop Arthur F. Kulah (Liberia)',
    category: 'Africa & Heritage',
    type: 'African Leader'
  },
  {
    id: 'q3',
    text: 'Therefore do not worry about tomorrow, for tomorrow will worry about itself. Each day has enough trouble of its own.',
    author: 'Jesus Christ',
    category: 'Overcoming Fear',
    type: 'Biblical',
    reference: 'Matthew 6:34'
  },
  {
    id: 'q4',
    text: 'Faith does not eliminate questions. But faith knows where to take them.',
    author: 'Elisabeth Elliot',
    category: 'Faith & Trust',
    type: 'Christian Author'
  },
  {
    id: 'q5',
    text: 'Do not grieve, for the joy of the Lord is your strength.',
    author: 'Nehemiah',
    category: 'Gratitude & Joy',
    type: 'Biblical',
    reference: 'Nehemiah 8:10'
  },
  {
    id: 'q6',
    text: 'God never makes mistakes. If He has set a vision in your heart on the shores of Liberia, He will build it.',
    author: 'Pastor Marcus Benson',
    category: 'Purpose & Calling',
    type: 'Pastoral'
  },
  {
    id: 'q7',
    text: 'I can do all things through Christ who strengthens me.',
    author: 'Apostle Paul',
    category: 'Strength & Courage',
    type: 'Biblical',
    reference: 'Philippians 4:13'
  },
  {
    id: 'q8',
    text: 'Fear is a liar, but hope is an anchor. Hold fast to the anchor during the storms of life.',
    author: 'Abina Sokpah',
    category: 'Hope & Healing',
    type: 'Original'
  },
  {
    id: 'q9',
    text: 'If you want to go fast, go alone. If you want to go far, go together in prayer.',
    author: 'African Proverb',
    category: 'Africa & Heritage',
    type: 'African Leader'
  },
  {
    id: 'q10',
    text: 'Today I am walking in the timing of the Almighty. I am fearfully and wonderfully made, and my breakthrough is secure.',
    author: 'Akin S. Sokpah',
    category: 'Youth & Identity',
    type: 'Affirmation'
  },
  {
    id: 'q11',
    text: 'Forgiveness is the key that unlocks the door of resentment and the handcuffs of hate.',
    author: 'Corrie ten Boom',
    category: 'Love & Forgiveness',
    type: 'Christian Author'
  },
  {
    id: 'q12',
    text: 'He leads me beside quiet waters, He restores my soul.',
    author: 'King David',
    category: 'Peace & Rest',
    type: 'Biblical',
    reference: 'Psalm 23:2-3'
  },
  {
    id: 'q13',
    text: 'True success is obedience to God. When Liberia sits in the dark, let your inner light shine in integrity and discipline.',
    author: 'Archbishop Michael Kpakala Francis',
    category: 'Success & Discipline',
    type: 'African Leader'
  },
  {
    id: 'q14',
    text: 'God has not given us a spirit of fear, but of power and of love and of a sound mind.',
    author: 'Apostle Paul',
    category: 'Mental Health',
    type: 'Biblical',
    reference: '2 Timothy 1:7'
  },
  {
    id: 'q15',
    text: 'The Lord will fight for you; you need only to be still.',
    author: 'Moses',
    category: 'Peace & Rest',
    type: 'Biblical',
    reference: 'Exodus 14:14'
  },
  {
    id: 'q16',
    text: 'Prayer is the spiritual breath of the Christian soldier in Liberia. Never go into the day without speaking to your Commander.',
    author: 'Mother Suah-Koko-Lee',
    category: 'Prayer & Worship',
    type: 'Pastoral'
  }
];

export const RECOVERY_TEMPTATIONS = [
  {
    id: 'lust',
    name: 'Lust',
    icon: 'Flame',
    victoryQuote: 'Flee from sexual immorality. Guard your thoughts; they are the blueprint of your future.',
    devotionalText: 'Lust promises instant satisfaction but leaves permanent empty voids. God calls you to a pure vessel of honor, crafted for noble purposes. Remember: God is not looking at your failures, He is waiting with outstretched arms to restore you.',
    verses: [
      { verse: '1 Corinthians 6:18', text: 'Flee sexual immorality. Every sin that a man does is outside the body, but he who commits sexual immorality sins against his own body.' },
      { verse: 'Matthew 5:28', text: 'But I say to you that whoever looks at a woman to lust for her has already committed adultery with her in his heart.' },
      { verse: 'Romans 13:14', text: 'But put on the Lord Jesus Christ, and make no provision for the flesh, to fulfill its lusts.' }
    ]
  },
  {
    id: 'anger',
    name: 'Anger',
    icon: 'Zap',
    victoryQuote: 'A gentle answer turns away wrath, but a harsh word stirs up anger.',
    devotionalText: 'Anger feels like fire, but it burns down the house you built with love. Allow the calm peace of the Holy Spirit to quench the embers of rage. Let go of the desire to defend yourself; God is your ultimate Advocate.',
    verses: [
      { verse: 'James 1:19-20', text: 'My beloved brothers, let every man be swift to hear, slow to speak, and slow to anger; for the anger of man doesn\'t produce the righteousness of God.' },
      { verse: 'Ephesians 4:26', text: 'Be angry, and don\'t sin. Don\'t let the sun go down on your wrath.' },
      { verse: 'Proverbs 15:1', text: 'A gentle answer turns away wrath, but a harsh word stirs up anger.' }
    ]
  },
  {
    id: 'fear',
    name: 'Fear & Anxiety',
    icon: 'ShieldAlert',
    victoryQuote: 'Fear says \"You will sink.\" Faith says \"The Lord of the oceans is checking the waves.\"',
    devotionalText: 'When fear knocks at the door of your heart, send faith to answer. The same God who carried Liberia through historic shadows is standing with you in your private room. Cast all your cares upon Him.',
    verses: [
      { verse: 'Isaiah 41:10', text: 'Don\'t be afraid, for I am with you. Don\'t be dismayed, for I am your God. I will strengthen you. Yes, I will help you. Yes, I will uphold you with the right hand of my righteousness.' },
      { verse: 'Philippians 4:6', text: 'In nothing be anxious, but in everything, by prayer and petition with thanksgiving, let your requests be made known to God.' },
      { verse: 'Psalm 56:3', text: 'What time I am afraid, I will put my trust in you.' }
    ]
  },
  {
    id: 'addiction',
    name: 'Addiction & Habits',
    icon: 'Activity',
    victoryQuote: 'No chain is too thick for the hammer of Calvary. You are being set free!',
    devotionalText: 'Addictions find their source in a search for comfort outside God. Today, exchange those heavy, binding yolk chains for the light, peaceful yoke of Christ. Take it one hour, one day, one breath at a time.',
    verses: [
      { verse: 'Galatians 5:1', text: 'Stand firm therefore in the liberty with which Christ has made us free, and don\'t be entangled again with a yoke of bondage.' },
      { verse: '1 Corinthians 10:13', text: 'No temptation has taken you except what is common to man. God is faithful, who will not allow you to be tempted above what you are able, but will with the temptation also make the way of escape, that you may be able to endure it.' },
      { verse: 'Romans 6:14', text: 'For sin will not have dominion over you. For you are not under law, but under grace.' }
    ]
  },
  {
    id: 'depression',
    name: 'Depression & Heavy Hearts',
    icon: 'CloudRain',
    victoryQuote: 'The dawn is coming! Joy comes in the morning for Monrovia.',
    devotionalText: 'Depression tells you that you are alone in a dark tunnel, but Christ is the light inside. He is close to the brokenhearted and saves those crushed in spirit. Offer Him your heavy garments; He gives a cloak of praise.',
    verses: [
      { verse: 'Psalm 34:18', text: 'The LORD is near to those who have a broken heart, and saves those who have a crushed spirit.' },
      { verse: 'Isaiah 61:3', text: 'To give to them a garland for ashes, the oil of joy for mourning, the garment of praise for the spirit of heaviness.' },
      { verse: 'Psalm 42:11', text: 'Why are you cast down, my soul? Why are you disquieted within me? Hope in God, for I shall still praise him, who is the help of my countenance, and my God.' }
    ]
  },
  {
    id: 'unforgiveness',
    name: 'Unforgiveness & Grudge',
    icon: 'HeartOff',
    victoryQuote: 'Holding a grudge is like drinking poison and waiting for the other person to fall.',
    devotionalText: 'Forgiveness does not make their action right; it sets you free from their prison. Turn over the keys of judgment to God, who judges righteously. Breathe in His mercy and release the weight of historical pains.',
    verses: [
      { verse: 'Colossians 3:13', text: 'bearing with one another, and forgiving each other, if any man has a complaint against any; even as Christ forgave you, so you also do.' },
      { verse: 'Matthew 6:14', text: 'For if you forgive men their trespasses, your heavenly Father will also forgive you.' },
      { verse: 'Ephesians 4:32', text: 'Be kind to one another, tenderhearted, forgiving each other, just as God also in Christ forgave you.' }
    ]
  }
];
