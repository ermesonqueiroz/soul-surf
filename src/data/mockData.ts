  import { Beach, Comment, LocationType, Post, Repair, Shop, WeatherForecast } from '../types';

  // Beaches in Fortaleza-CE
  export const beaches: Beach[] = [
    {
      id: 'beach-1',
      name: 'Praia do Futuro',
      type: LocationType.BEACH,
      coordinates: [-3.7413, -38.4500],
      description: 'Praia popular com ondas consistentes, perfeita para iniciantes e surfistas intermediários.',
      waveQuality: 4,
      difficulty: 2,
      bestTide: 'Maré média a alta',
      bestWind: 'Terral (SO)'
    },
    {
      id: 'beach-2',
      name: 'Praia de Iracema',
      type: LocationType.BEACH,
      coordinates: [-3.7204, -38.5138],
      description: 'Praia urbana com quebra de recife, boa para surfistas intermediários durante o swell adequado.',
      waveQuality: 3,
      difficulty: 3,
      bestTide: 'Maré baixa a média',
      bestWind: 'Terral (S)'
    },
    {
      id: 'beach-3',
      name: 'Praia do Titanzinho',
      type: LocationType.BEACH,
      coordinates: [-3.7100, -38.4683], // Updated coordinates more to the south
      description: 'Point break famoso com ondas potentes, berço de muitos profissionais brasileiros.',
      waveQuality: 5,
      difficulty: 4,
      bestTide: 'Todas as marés, melhor na média',
      bestWind: 'Terral (SO)'
    }

  ];

  // Surfboard repair shops
  export const repairs: Repair[] = [
    {
      id: 'repair-1',
      name: 'Ceará Ding Repair',
      type: LocationType.REPAIR,
      coordinates: [-3.7307, -38.5003],
      instagram: '@cearadingrepair',
      phone: '+55 85 98765-4321',
      whatsapp: '+55 85 98765-4321',
      rating: 4.8,
      specialty: 'Todos os reparos, especializado em fibra de vidro',
      hours: 'Seg-Sex: 9h-18h, Sáb: 9h-14h'
    },
    {
      id: 'repair-2',
      name: 'Mestre Shaper',
      type: LocationType.REPAIR,
      coordinates: [-3.7337, -38.4931],
      instagram: '@mestreshaper',
      phone: '+55 85 99876-5432',
      rating: 4.5,
      specialty: 'Shape personalizado e reparos',
      hours: 'Seg-Sáb: 10h-19h'
    }
  ];

  // Surfboard shops
  export const shops: Shop[] = [
    {
      id: 'shop-1',
      name: 'Fortaleza Surf ',
      type: LocationType.SHOP,
      coordinates: [-3.7280, -38.5020],
      instagram: '@fortalezasurfshop',
      phone: '+55 85 3222-1234',
      whatsapp: '+55 85 98888-1234',
      rating: 4.6,
      hours: 'Diariamente: 9h-20h'
    },
    {
      id: 'shop-2',
      name: 'Rip Wave Store',
      type: LocationType.SHOP,
      coordinates: [-3.7350, -38.5070],
      instagram: '@ripwavestore',
      phone: '+55 85 3222-5678',
      rating: 4.2,
      hours: 'Seg-Sáb: 10h-19h'
    },
    {
      id: 'shop-3',
      name: 'Ceará Surfboards',
      type: LocationType.SHOP,
      coordinates: [-3.7420, -38.4900],
      instagram: '@cearasurfboards',
      phone: '+55 85 3222-9012',
      whatsapp: '+55 85 99999-9012',
      rating: 4.7,
      hours: 'Diariamente: 8h-21h'
    }
  ];

  // All locations combined
  export const allLocations = [...beaches, ...repairs, ...shops];

  // Posts
  export const posts: Post[] = [
    {
      id: 'post-1',
      locationId: 'beach-1',
      author: 'Medina',
      date: '2025-06-09T08:30:00',
      imageUrl: 'https://imagens.ebc.com.br/U6g70x4QG-sLrWqpwzGKwws-he8=/1170x700/smart/https://agenciabrasil.ebc.com.br/sites/default/files/thumbnails/image/2024/08/05/whatsapp_image_2024-08-05_at_18.37.12.jpeg?itok=Xq-k7mtQ',
      content: 'Hoje tava dificil viu haha, praia do futuro tem dia que tá com raiva',
      likes: 152
    },
    {
      id: 'post-2',
      locationId: 'beach-2',
      author: 'Thiago Pinheiro',
      date: '2025-06-06T16:45:00',
      imageUrl: 'https://i.imgur.com/zGjg3wR.jpeg',
      content: 'Iracema entregando umas ondas maneiras depois do trabalho! Nem tá muito cheio.',
      likes: 89
    },
    {
      id: 'post-3',
      locationId: 'beach-3',
      author: 'Kelly Slater',
      date: '2025-06-04T07:15:00',
      imageUrl: 'https://image-cdn.essentiallysports.com/wp-content/uploads/GettyImages-1610594625.jpg?width=600',
      content: 'The best experience I ever had in a long time, love u Fortaleza ',
      likes: 217
    }
  ];

  // Comments
  export const comments: Comment[] = [
    {
      id: 'comment-1',
      locationId: 'beach-1',
      postId: 'post-1',
      author: 'João Pedro',
      date: '2025-04-01T09:15:00',
      content: 'Hoje tava muito dificil',
      likes: 24
    },
    {
      id: 'comment-2',
      locationId: 'beach-1',
      postId: 'post-1',
      author: 'Carla Mendes',
      date: '2025-04-01T10:30:00',
      content: 'Como tava o crowd? Pensando em ir.',
      likes: 8
    },
    {
      id: 'comment-3',
      locationId: 'beach-1',
      author: 'Lucas Martins',
      date: '2025-06-09T08:45:00',
      content: 'Tava impossivel',
      likes: 42
    },
    {
      id: 'comment-4',
      locationId: 'beach-2',
      postId: 'post-2',
      author: 'Pedro Alves',
      date: '2025-06-09T17:30:00',
      content: 'as ondas hojes tão muito boas!',
      likes: 5
    },
    {
      id: 'comment-5',
      locationId: 'beach-3',
      postId: 'post-3',
      author: 'Bianca Lima',
      date: '2025-06-09T08:00:00',
      content: 'Titanzinho absolutamente perfeito! Hoje mandei meu primeiro aéreo',
      likes: 31
    },
    {
      id: 'comment-6',
      locationId: 'beach-3',
      author: 'Fernando Sousa',
      date: '2025-04-02T11:20:00',
      content: 'Alguém sabe se vale a pena dar um drop essa tarde? O swell ainda tá segurando?',
      likes: 14
    }
  ];

  // Mock weather forecast data
  export const weatherForecasts: Record<string, WeatherForecast[]> = {
    'beach-1': [
      {
        date: '2025-04-03',
        time: '06:00',
        temperature: 26,
        windSpeed: 10,
        windDirection: 225, // SO
        waveHeight: 1.2,
        wavePeriod: 8,
        precipitation: 0
      },
      {
        date: '2025-04-03',
        time: '12:00',
        temperature: 30,
        windSpeed: 15,
        windDirection: 180, // S
        waveHeight: 1.4,
        wavePeriod: 9,
        precipitation: 0
      },
      {
        date: '2025-04-03',
        time: '18:00',
        temperature: 28,
        windSpeed: 12,
        windDirection: 135, // SE
        waveHeight: 1.1,
        wavePeriod: 7,
        precipitation: 10
      }
    ],
    'beach-2': [
      {
        date: '2025-04-03',
        time: '06:00',
        temperature: 25,
        windSpeed: 8,
        windDirection: 200, // SSO
        waveHeight: 0.9,
        wavePeriod: 6,
        precipitation: 0
      },
      {
        date: '2025-04-03',
        time: '12:00',
        temperature: 29,
        windSpeed: 14,
        windDirection: 170, // S
        waveHeight: 1.1,
        wavePeriod: 7,
        precipitation: 0
      },
      {
        date: '2025-04-03',
        time: '18:00',
        temperature: 27,
        windSpeed: 16,
        windDirection: 150, // SSE
        waveHeight: 1.0,
        wavePeriod: 6,
        precipitation: 20
      }
    ],
    'beach-3': [
      {
        date: '2025-04-03',
        time: '06:00',
        temperature: 26,
        windSpeed: 12,
        windDirection: 220, // SO
        waveHeight: 1.5,
        wavePeriod: 10,
        precipitation: 0
      },
      {
        date: '2025-04-03',
        time: '12:00',
        temperature: 30,
        windSpeed: 18,
        windDirection: 185, // S
        waveHeight: 1.6,
        wavePeriod: 11,
        precipitation: 0
      },
      {
        date: '2025-04-03',
        time: '18:00',
        temperature: 28,
        windSpeed: 15,
        windDirection: 160, // SSE
        waveHeight: 1.4,
        wavePeriod: 9,
        precipitation: 10
      }
    ]
  };

  // Helper function to get the top posts for a beach
  export const getTopPostForBeach = (beachId: string): Post | undefined => {
    return posts
      .filter(post => post.locationId === beachId)
      .sort((a, b) => b.likes - a.likes)[0];
  };

  // Helper function to get the most relevant comment for a beach
  export const getTopCommentForBeach = (beachId: string): Comment | undefined => {
    return comments
      .filter(comment => comment.locationId === beachId)
      .sort((a, b) => b.likes - a.likes)[0];
  };

  // Helper function to get recent comments for a beach
  export const getRecentCommentsForBeach = (beachId: string, limit: number = 5): Comment[] => {
    return comments
      .filter(comment => comment.locationId === beachId)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, limit);
  };

  // Helper function to get weather forecast for a beach
  export const getWeatherForecastForBeach = (beachId: string): WeatherForecast[] => {
    return weatherForecasts[beachId] || [];
  };