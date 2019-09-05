const users = [
  {
    id: 1,
    email: 'byusa@gmail.com',
    firstName: 'Uwase',
    lastName: 'Verdique',
    password: '$2b$10$hwkOJznThaAoSN3KkntBFO7/BazavJU1BYh6lvemXa33/4t0.UAdu',
    birthdate: '12/5/1996',
    occupation: 'student',
    expertise: 'software',
    bio: 'inspire the next',
    phoneNumber: ' +250782314242',
    address: 'UMUSAVE',
    role: 'mentor',
    isAdmin: false
  },
  {
    id: 2,
    email: 'niyeric11@gmail.com',
    firstName: 'NIYONSENGA',
    lastName: 'ERIC',
    password: '$2b$10$hwkOJznThaAoSN3KkntBFO7/BazavJU1BYh6lvemXa33/4t0.UAdu',
    birthdate: '12/5/1996',
    occupation: 'student',
    expertise: 'software',
    bio: 'inspire the next',
    phoneNumber: '+250789769787',
    address: 'TORONTO',
    role: 'mentree',
    isAdmin: false
  },
  {
    id: 3,
    email: 'jaja@gmail.com',
    firstName: 'HAVUGIMANA',
    lastName: 'BENIT',
    password: '$2b$10$hwkOJznThaAoSN3KkntBFO7/BazavJU1BYh6lvemXa33/4t0.UAdu',
    birthdate: '12/5/1996',
    occupation: 'student',
    expertise: 'software',
    bio: 'inspire the next',
    phoneNumber: ' +250782314242',
    address: 'GACYAMO',
    role: 'mentree',
    isAdmin: false
  },
  {
    id: 4,
    email: 'robert@gmail.com',
    firstName: 'MUHIRE',
    lastName: 'ROBERT',
    password: '$2b$10$hwkOJznThaAoSN3KkntBFO7/BazavJU1BYh6lvemXa33/4t0.UAdu',
    birthdate: '12/5/1996',
    occupation: 'student',
    expertise: 'software',
    bio: 'inspire the next',
    phoneNumber: ' +250782314242',
    address: 'RUTURUSU',
    role: 'mentree',
    isAdmin: false
  },
  {
    id: 5,
    email: 'sandrine@gmail.com',
    firstName: 'UMWALI',
    lastName: 'SANDRINE',
    password: '$2b$10$hwkOJznThaAoSN3KkntBFO7/BazavJU1BYh6lvemXa33/4t0.UAdu',
    birthdate: '12/5/1996',
    occupation: 'student',
    expertise: 'software',
    bio: 'inspire the next',
    phoneNumber: ' +250782314242',
    address: 'RUTURUSU',
    role: 'mentor',
    isAdmin: false
  }
];

let sessions = [
  {
    id: 2,
    mentorId: '5',
    mentreeId: '2',
    questions: 'i like explore new things',
    mentreeEmail: 'eric@gmail.com',
    status: 'pending'
  },
  {
    id: 3,
    mentorId: '3',
    mentreeId: '4',
    questions: 'Guide me to be great',
    mentreeEmail: 'alfred@gmail.com',
    status: 'pending'
  }
];

export default {
  users,
  sessions
};
