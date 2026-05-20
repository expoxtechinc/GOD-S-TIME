import { WorshipHymn } from '../types';

export const STATIC_HYMNS: WorshipHymn[] = [
  {
    id: 'h1',
    title: 'Blessed Assurance',
    lyrics: `Blessed assurance, Jesus is mine!
Oh, what a foretaste of glory divine!
Heir of salvation, purchase of God,
Born of His Spirit, washed in His blood.

This is my story, this is my song,
Praising my Savior all the day long;
This is my story, this is my song,
Praising my Savior all the day long.`,
    theme: 'Assurance & Trust',
    author: 'Fanny Crosby',
    chords: 'C - F - C - G'
  },
  {
    id: 'h2',
    title: 'How Great Thou Art',
    lyrics: `O Lord my God, when I in awesome wonder,
Consider all the worlds Thy Hands have made;
I see the stars, I hear the rolling thunder,
Thy power throughout the universe displayed.

Then sings my soul, My Saviour God, to Thee,
How great Thou art, How great Thou art!
Then sings my soul, My Saviour God, to Thee,
How great Thou art, How great Thou art!`,
    theme: 'Worship & Praise',
    author: 'Carl Boberg',
    chords: 'G - C - G - D'
  },
  {
    id: 'h3',
    title: 'Amazing Grace (with African Harmonies)',
    lyrics: `Amazing grace! How sweet the sound
That saved a wretch like me!
I once was lost, but now am found;
Was blind, but now I see.

'Twas grace that taught my heart to fear,
And grace my fears relieved;
How precious did that grace appear
The hour I first believed.`,
    theme: 'Grace & Redemption',
    author: 'John Newton',
    chords: 'F - Bb - F - C'
  },
  {
    id: 'h4',
    title: 'What a Friend We Have in Jesus',
    lyrics: `What a Friend we have in Jesus,
All our sins and griefs to bear!
What a privilege to carry
Everything to God in prayer!
O what peace we often forfeit,
O what needless pain we bear,
All because we do not carry
Everything to God in prayer!`,
    theme: 'Prayer & Comfort',
    author: 'Joseph Scriven',
    chords: 'D - G - D - A'
  }
];

export const LIBERIAN_CHURCHES = [
  {
    id: 'ch1',
    name: 'Providence Baptist Church',
    pastor: 'Rev. Dr. Samuel B. Reeves Jr.',
    denomination: 'Baptist',
    location: 'Broad Street, Monrovia, Liberia',
    coordinates: { lat: 6.3149, lng: -10.8048 },
    serviceTimes: ['Sunday 8:00 AM', 'Sunday 10:30 AM', 'Wednesday Study 5:00 PM'],
    contact: '+231-77-555-0101',
    district: 'Greater Monrovia',
    description: 'The historic birth church of the Liberian Nation, standing as a monument of faith since 1822.'
  },
  {
    id: 'ch2',
    name: 'Sacred Heart Cathedral',
    pastor: 'Father Jenkins Davies',
    denomination: 'Catholic',
    location: 'Broad & Ashmun Streets, Monrovia, Liberia',
    coordinates: { lat: 6.3138, lng: -10.8062 },
    serviceTimes: ['Sunday Mass 7:30 AM', 'Sunday Mass 9:30 AM', 'Daily Mass 12:15 PM'],
    contact: '+231-88-612-3456',
    district: 'Snapper Hill',
    description: 'Cathedral of the Catholic Archdiocese of Monrovia, providing structural restoration and spiritual shelter.'
  },
  {
    id: 'ch3',
    name: 'S S M G First United Methodist Church',
    pastor: 'Rev. Dr. Julius Y. Williams',
    denomination: 'Methodist',
    location: 'Ashmun Street, Monrovia, Liberia',
    coordinates: { lat: 6.3161, lng: -10.8033 },
    serviceTimes: ['Sunday 9:00 AM', 'Thursday Prayer 4:00 PM'],
    contact: '+231-77-623-9999',
    district: 'Ashmun St',
    description: 'Empowering communities through methodical discipleship, youth development, and missions across Liberia.'
  },
  {
    id: 'ch4',
    name: 'St. Thomas Episcopal Church',
    pastor: 'Canon James B. Sellee',
    denomination: 'Episcopal',
    location: 'Camp Johnson Road, Monrovia, Liberia',
    coordinates: { lat: 6.3045, lng: -10.7981 },
    serviceTimes: ['Sunday Rite I 8:00 AM', 'Sunday Rite II 10:00 AM'],
    contact: '+231-88-511-2233',
    district: 'Camp Johnson',
    description: 'A vibrant Anglican community in Monrovia dedicated to historical worship and local restoration.'
  },
  {
    id: 'ch5',
    name: 'Monrovia Free Pentecostal Church',
    pastor: 'Apostle J. Hector Cooper',
    denomination: 'Pentecostal',
    location: 'Sinkor, 10th Street, Monrovia, Liberia',
    coordinates: { lat: 6.2917, lng: -10.7811 },
    serviceTimes: ['Sunday Revival 9:00 AM', 'Friday Deliverance Night 6:00 PM'],
    contact: '+231-77-900-1111',
    district: 'Sinkor',
    description: 'A fiery pentecostal assembly experiencing the manifest healing presence and charismatic power of the Spirit.'
  }
];

export const LIBERIAN_REGION_DENOMINATIONS = {
  denominations: ['Nondenominational', 'Baptist', 'Methodist', 'Catholic', 'Episcopal', 'Pentecostal', 'Lutheran', 'Assembly of God'],
  regions: [
    'Montserrado (Monrovia, Sinkor, Paynesville)',
    'Margibi (Kakata, Robertsfield)',
    'Grand Bassa (Buchanan)',
    'Nimba (Sanniquellie, Ganta)',
    'Lofa (Voinjama)',
    'Bong (Gbarnga)',
    'Maryland (Harper)',
    'Sinoe (Greenville)',
    'Grand Cape Mount (Robertsport)'
  ]
};
