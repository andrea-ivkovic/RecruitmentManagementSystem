import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { Cell, LabelList, Legend, Pie, PieChart,  } from "recharts";
import { applicantsByJobDTO } from "../applicant/applicant.model";
import { urlApplicants } from "../endpoints";

export default function ApplicantsByJobTitle() {

    const colors = ["#5274c8", "#8be389", "#ffea77", "#ff9d41", "#de489e", "#7f47ca", "#756d84", "#46b6b8", "#ff6500", "#c85b5a"];

    const [data, setData] = useState<applicantsByJobDTO[]>();

    useEffect(() => {
        axios.get(`${urlApplicants}/applicantsNumber`)
            .then((response: AxiosResponse<applicantsByJobDTO[]>) => {
                setData(response.data);
            });
    }, []);

    function setLabel(entry: any) {
        if (entry.value >= 1) {
            return entry.name + ' (' + entry.value + ')';
        }
        return null;
    }

    return (
        <>
            <div style={{ position: 'relative' }}  className="job-info-details-container">
                <span style={{ position: 'relative', top: '10px', left: '10px', fontFamily: 'Roboto', fontWeight: '400' }}>Applicants By Job Title</span>
                <PieChart width={550} height={200} style={{ position: 'relative', top: '-15px' }}>
            
                        <Legend layout="vertical" verticalAlign="middle" align="right" />
                    
                    <Pie
                        stroke="none"
                        data={data}
                        cx={200}
                        cy={100}
                        outerRadius={65}
                        paddingAngle={0}
                        fill="#8884d8" dataKey={"value"} nameKey="name" label={(entry) => entry.value}>
                        {
                            data?.filter(entry => entry.value > 0).map((entry, index) =>
                                <Cell key={index} fill={colors[index % colors.length]} />
                            )
                        }
                    </Pie>

                </PieChart>
            </div>
        </>
    )
}