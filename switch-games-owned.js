const gamesOwned = [
  {
    title: 'Resident Evil',
    dateBought: '11/25/2022',
    paid: 10.23,
    gameFormat: 'digital'
  },
  {
    title: 'Valfaris & Slain Double Pack',
    dateBought: '03/02/2023',
    paid: 0.5,
    gameFormat: 'digital'
  },
  {
    title: 'CHRONO CROSS: THE RADICAL DREAMERS EDITION',
    dateBought: '03/12/2023',
    paid: null,
    redeemed: true,
    gameFormat: 'digital'
  },
  {
    title: 'Valfaris & Slain Double Pack',
    dateBought: '03/02/2023',
    paid: 0.5,
    gameFormat: 'digital'
  },
  {
    title: 'INSIDE',
    dateBought: '03/22/2023',
    paid: 1.02,
    gameFormat: 'digital'
  },
  {
    title: 'Minit',
    dateBought: '04/07/2023',
    paid: 2.11,
    gameFormat: 'digital'
  },
  {
    title: 'SteamWorld Dig 2',
    dateBought: '04/07/2023',
    paid: 6.35,
    gameFormat: 'digital'
  },
  {
    title: 'SteamWorld Heist: Ultimate Edition',
    dateBought: '04/07/2023',
    paid: 4.81,
    gameFormat: 'digital'
  },
  {
    title: 'Inscryption',
    dateBought: '04//2023',
    paid: 15.65,
    gameFormat: 'digital'
  },
  {
    title: 'Gato Roboto',
    dateBought: '04/17/2023',
    paid: 1.33,
    gameFormat: 'digital'
  },
  {
    title: 'Chained Echoes',
    dateBought: '04/19/2023',
    paid: 22.44,
    gameFormat: 'digital'
  },
  {
    title: 'Shovel Knight: Treasure Trove',
    dateBought: '04/19/2023',
    paid: 20.07,
    gameFormat: 'digital'
  },
  {
    title: 'TOEM',
    dateBought: '04/24/2023',
    paid: 6.19,
    gameFormat: 'digital'
  },
  {
    title: 'Omega Strikers',
    dateBought: '04/29/2023',
    paid: 0.0,
    gameFormat: 'digital'
  },
  {
    title: "Don't Stave Together",
    dateBought: '04/30/2023',
    paid: 1.79,
    gameFormat: 'digital'
  },
  {
    title: 'Lil Gator Game',
    dateBought: '04/30/2023',
    paid: 14.73,
    gameFormat: 'digital'
  },
  {
    title: 'LIMBO',
    dateBought: '05/01/2023',
    paid: 1.37,
    gameFormat: 'digital'
  },
  {
    title: 'The Legend of Zelda: Tears of the Kingdom',
    dateBought: '05/12/2023',
    paid: null,
    redeemed: true,
    gameFormat: 'digital'
  },
  {
    title: 'Kirby’s Return to Dream Land Deluxe',
    dateBought: '05/12/2023',
    paid: null,
    redeemed: true,
    gameFormat: 'digital'
  },
  {
    title: 'F-ZERO 99',
    dateBought: '09/16/2023',
    paid: 0.0,
    gameFormat: 'digital'
  },
  {
    title: 'Vampire Survivors',
    dateBought: '09/16/2023',
    paid: 0.0,
    gameFormat: 'digital'
  },
  {
    title: 'Super Mario Bros. Wonder',
    dateBought: '10/19/2023',
    paid: null,
    redeemed: true,
    gameFormat: 'digital'
  },
  {
    title: 'Quake',
    dateBought: '10/26/2023',
    paid: 4.23,
    gameFormat: 'digital'
  },
  {
    title: 'Quake II',
    dateBought: '10/26/2023',
    paid: 0.0,
    gameFormat: 'digital'
  },
  {
    title: 'Bloodstained: Ritual of the Night',
    dateBought: '11/03/2023',
    paid: 11.43,
    gameFormat: 'digital'
  },
  {
    title: 'ENDER LILIES: Quietus of the Knights',
    dateBought: '11/09/2023',
    paid: 12.67,
    gameFormat: 'digital'
  },
  {
    title: 'Blasphemous 2',
    dateBought: '11/09/2023',
    paid: 20.66,
    gameFormat: 'digital'
  },
  {
    title: 'Super Mario RPG',
    dateBought: '11/10/2023',
    paid: null,
    redeemed: true,
    gameFormat: 'digital'
  },
  {
    title: 'DARK SOULS: REMASTERED',
    dateBought: '11/21/2023',
    paid: 21.19,
    gameFormat: 'digital'
  },
  {
    title: 'TUNIC',
    dateBought: '11/21/2023',
    paid: 21.19,
    gameFormat: 'digital'
  },
  {
    title: 'Dicey Dungeons',
    dateBought: '12/21/2023',
    paid: 2.11,
    gameFormat: 'digital'
  },
  {
    title: 'XCOM 2 Collection',
    dateBought: '12/21/2023',
    paid: 0.0,
    gameFormat: 'digital'
  },
  {
    title: 'ABZU',
    dateBought: '12/21/2023',
    paid: 1.46,
    gameFormat: 'digital'
  },
  {
    title: 'Cult of the Lamb: Cultist Edition',
    dateBought: '12/22/2023',
    paid: 19.0,
    gameFormat: 'digital'
  },
  {
    title: 'DOOM (1993)',
    dateBought: '03/13/2024',
    paid: 4.34,
    gameFormat: 'digital'
  },
  {
    title: 'ANIMAL WELL',
    dateBought: '06/28/2024',
    paid: 23.62,
    gameFormat: 'digital'
  },
  {
    title: 'Sea of Stars',
    dateBought: '07/07/2024',
    paid: 35.9,
    gameFormat: 'digital'
  },
  {
    title: 'Sonic Origins: Plus Content Pack',
    dateBought: '08/12/2024',
    paid: null,
    redeemed: true,
    gameFormat: 'digital'
  },
  {
    title: 'Neon White',
    dateBought: '08/12/2024',
    paid: 15.89,
    gameFormat: 'digital'
  },
  {
    title: 'Shadows Over Loathing',
    dateBought: '08/31/2024',
    paid: 14.23,
    gameFormat: 'digital'
  },
  {
    title: 'The Messenger',
    dateBought: '08/31/2024',
    paid: 3.51,
    gameFormat: 'digital'
  },
  {
    title: 'Ultimate Chicken Horse',
    dateBought: '10/02/2024',
    paid: 6.96,
    gameFormat: 'digital'
  },
  {
    title: 'SteamWorld Quest: Hand of Gilgamech',
    dateBought: '10/03/2024',
    paid: 3.61,
    gameFormat: 'digital'
  },
  {
    title: 'Balatro',
    dateBought: '10/18/2024',
    paid: 13.31,
    gameFormat: 'digital'
  },
  {
    title: 'Metal Slug Tactics',
    dateBought: '11/06/2024',
    paid: 23.17,
    gameFormat: 'digital'
  }
]
