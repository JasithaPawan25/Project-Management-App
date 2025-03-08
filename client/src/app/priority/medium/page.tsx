"use client";

import React from 'react'
import ReusablePriorityPage from '../reuserblePriorityPage';
import { Priority } from '@/state/api';

type Props = {}

const Urgent = (props: Props) => {
  return (
    <ReusablePriorityPage priority={Priority.Low} />
  )
}

export default Urgent