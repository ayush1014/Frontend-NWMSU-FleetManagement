import { EnvelopeIcon, PhoneIcon, MagnifyingGlassIcon, UserPlusIcon } from '@heroicons/react/20/solid'
import Navigation from './Navigation'
const people = [
    {
        name: 'Cindy Tu',
        title: 'Professor',
        role: 'Admin',
        email: '#',
        telephone: '+1-202-555-0170',
        imageUrl:
            'https://www.nwmissouri.edu/csis/images/people/tu.jpg',
    },
    {
        name: 'Elon Musk',
        title: 'Ceo',
        role: 'User',
        email: '#',
        telephone: '+1-202-555-0170',
        imageUrl:
            'https://fortune.com/img-assets/wp-content/uploads/2023/09/MUS1123.Elon-Musk.jpg?w=1440&q=75',
    },

    {
        name: 'Tim Cook',
        title: 'Ceo',
        role: 'User',
        email: '#',
        telephone: '+1-202-555-0170',
        imageUrl:
            'data:image/jpeg;base64,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',
    },
    {
        name: 'Jeff Bezoz',
        title: 'Ceo',
        role: 'User',
        email: '#',
        telephone: '+1-202-555-0170',
        imageUrl:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxNGGKu4UGhKOou8GsFi7k89kLcyfk2r5gyQ&s',
    },
    {
        name: 'Sam Altman',
        title: 'Open AI',
        role: 'User',
        email: '#',
        telephone: '+1-202-555-0170',
        imageUrl:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTi-sCr0S-RQZ1YaC6WCNoYA3Z381uM2ETlFQ&s',
    },
    {
        name: 'Ted Baker',
        title: 'Ted Talker',
        role: 'User',
        email: '#',
        telephone: '+1-202-555-0170',
        imageUrl:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9oO589qjF1YQetfsqYG5dARPC6jeYYz6oxQ&s',
    },
]

export default function Users() {
    return (
        <div className='min-h-screen bg-gray-200'>
            <Navigation />

            <main className='lg:pl-[23%] lg:pr-[4%] mt-[2%] '>
                <div className="mb-6">
                    <div className="relative rounded-full shadow-sm">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                            <MagnifyingGlassIcon
                                className="h-5 w-5 text-gray-400"
                                aria-hidden="true"
                            />
                        </div>
                        <input
                            type="text"
                            name="search"
                            id="search"
                            className="block w-full rounded-full border-0 py-2 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                            placeholder="Search users..."
                        />
                    </div>
                </div>
                <div className='mb-6'>
                    <button
                        type="button"
                        className="absolute right-[100px] rounded-md bg-green-100 px-3.5 py-2.5 text-base font-semibold text-green-800 shadow-sm hover:bg-green-100"
                    >
                        <div className='flex flex-row gap-2'><UserPlusIcon className='w-6 h-6' /> <span>Add Users</span></div>
                    </button>
                </div>
                <ul role="list" className="mt-24 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {people.map((person) => (
                        <li key={person.email} className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow">
                            <div className="flex w-full items-center justify-between space-x-6 p-6">
                                <div className="flex-1 truncate">
                                    <div className="flex items-center space-x-3">
                                        <h3 className="truncate text-sm font-medium text-gray-900">{person.name}</h3>
                                        <span className={`inline-flex shrink-0 items-center rounded-full px-1.5 py-0.5 text-xs font-medium ${person.role == 'Admin'?'text-green-700 ring-green-600/20 bg-green-50': 'text-red-700 ring-red-600/20 bg-red-50'}  ring-1 ring-inset `}>
                                            {person.role}
                                        </span>
                                    </div>
                                    <p className="mt-1 truncate text-sm text-gray-500">{person.title}</p>
                                </div>
                                <img alt="" src={person.imageUrl} className="size-12 shrink-0 rounded-full bg-gray-300 object-cover"/>
                            </div>
                            <div>
                                <div className="-mt-px flex divide-x divide-gray-200">
                                    <div className="flex w-0 flex-1">
                                        <a
                                            href={`mailto:${person.email}`}
                                            className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
                                        >
                                            <EnvelopeIcon aria-hidden="true" className="size-5 text-gray-400" />
                                            Email
                                        </a>
                                    </div>
                                    <div className="-ml-px flex w-0 flex-1">
                                        <a
                                            href={`tel:${person.telephone}`}
                                            className="relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
                                        >
                                            <PhoneIcon aria-hidden="true" className="size-5 text-gray-400" />
                                            Call
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </main>
        </div>
    )
}
