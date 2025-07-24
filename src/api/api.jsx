import axios from 'axios';

const EndPoint = `https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json`;

export default async function getEmpData(){
    try {
        const response = await axios.get(EndPoint);
        return response.data;
    } catch (error) {
        
        console.error("Error fetching employee data:", error);
        alert("failed to fetch data");
        return [];
    }
}