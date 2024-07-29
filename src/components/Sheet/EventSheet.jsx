import React from 'react'
import { BsToggleOn } from "react-icons/bs";
import './Eventsheet.css'

const data = [
    {
      ID:'24',
      CHALLENGER: 'John Doe',
      OPPONENT:'CHAN BING',
      EVENTDATE:'Choose',
      EVENTTime:'Choose',
      APPROVE: <BsToggleOn />,
      EventAction:'Schedule Event'
    },
    {
        ID:'21',
        CHALLENGER: 'John Doe',
        OPPONENT:'CHAN BING',
        EVENTDATE:'Choose',
        EVENTTime:'Choose',
        APPROVE: <BsToggleOn />,
        EventAction:'Schedule Event'
    },
    
  ];
  

const EventSheet = () => {
  return (
    <div className='py-4'>
      <div className='overflow-x-auto rounded-lg border-gray-500'>
      <table className='w-full  bg-white border-collapse'>
          <thead className='bg-[#FFA768] text-white rounded-lg h-10'>
            <tr >
              <th className='w-[18%]  px-3 uppercase font-semibold text-sm'>ID</th>
              <th className='w-[20%]  px-3 uppercase font-semibold text-sm'>CHALLENGER</th>
              <th className='w-[20%]  px-3 uppercase font-semibold text-sm'>OPPONENT</th>
              <th className='w-[16%]  px-2 uppercase font-semibold text-sm'>EVENT DATE  </th>
              <th className='w-[20%]  px-3 uppercase font-semibold text-sm whitespace-nowrap action'>EVENT TIME</th>
              <th className='w-[23%]  px-3 uppercase font-semibold text-sm whitespace-nowrap'>APPROVE</th>
              <th className='w-[25%]  px-3 uppercase font-semibold text-sm whitespace-nowrap'>EVENT ACTION</th>
            </tr>
          </thead>
          <tbody className='text-gray-700'>
            {data.map((item, index) => (
              <tr key={index} className='rows'>
                <td className='w-[18%] py-2 px-4 '>{item.ID}</td>
                <td className='w-[20%] py-2 px-4 '>{item.CHALLENGER}</td>
                <td className='w-[20%] py-2 px-4 '>{item.OPPONENT}</td>
                <td className='w-[16%] py-2 px-14  '>{item.EVENTDATE}  </td>
                <td className='w-[20%] py-2 pl-16  '>{item.EVENTTime}  </td>
                <td className='w-[23%] py-2 pl-8  text-2xl '>{item.APPROVE}</td>
                <td className='w-[25%]  eventaction '><button>{item.EventAction}
                  </button>
                  
                  <div className='span'>
                    <ul>
                      <li>
                        Go live 
                      </li>
                      <li>
                        Schedual for later
                      </li>
                    </ul>
                    </div>
                </td>
              </tr>             
            ))}
          </tbody>
        </table>
      </div>  
    </div>
  )
}

export default EventSheet
