import { planAPI } from '@/utils/api-client';
import { useSession } from 'next-auth/react';
import React from 'react'

function plan() {


  const { data: session, status } = useSession()

  async function get() {
    const planData = {
      prompt: "response.data.response",
      startDate: new Date("2023-12-10"),
      endDate: new Date("2023-12-10"),
      budget: "budgetDescription",
      travelers: { adults: "data.travelers.adults", children: "data.travelers.children", infants: "data.travelers.infants", pets: "data.travelers.pets" },
      selectedViber: ["travelVibes"],

    }
    const response = await planAPI.createPlan(planData)
    console.log(response.data)

  }
  async function fech() {
    const data = 'ds'
    const response = await planAPI.getPlan()
    console.log(response.data)

  }
  return (
    <div>
      <div><button onClick={get}>get</button></div>
      <div><button onClick={fech}>fetch</button></div>
    </div>
  )
}

export default plan