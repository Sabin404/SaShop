import { filterOptions } from '@/config'
import React from 'react'
import { Label } from '../ui/label'
import { Checkbox } from '../ui/checkbox'

const Filter = () => {
  return (
    <div className='bg-background rounded-lg shadow-sm'>
    <div className='p-4 border-b'>
      <h2 className='text-lg font-semibold'>Filters</h2>
    </div>
      <div className='p-4 space-y-4'>
        {
          Object.keys(filterOptions).map(keyItems=><>
            <div>
              <h3 className='font-bold text-base'>{keyItems}</h3>
              <div className='grid gap-2 mt-2'>
                {
                  filterOptions[keyItems].map(option=><Label className='flex gap-2 items-center font-medium'>
                      <Checkbox/>
                      {option.label}
                  </Label>)
                }
              </div>
            </div>
          </>)
        }
      </div>
    </div>
  )
}

export default Filter
