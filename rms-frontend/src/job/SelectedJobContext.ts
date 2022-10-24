import React from 'react';
import { jobDTO } from './job.model';

const SelectedJobContext = React.createContext<{
    setSelectedJob(job: jobDTO): void 
}>({setSelectedJob: () => {}})

export default SelectedJobContext;