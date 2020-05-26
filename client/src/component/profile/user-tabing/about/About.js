import React from 'react'
import BasicInfo from './basic-info/BasicInfo';
import Family from './family/Family';
import WorkAndEdu from './work-and-edu/WorkAndEdu';
import Lived from './lived/Lived';
import Details from './details/Details';

const About = ({user}) => {
    return (
        <div className="tab-pane fade active show" id="about" role="tabpanel">
            <div className="iq-card">
                <div className="iq-card-body">
                <div className="row">
                    <div className="col-md-3">
                    <ul className="nav nav-pills basic-info-items list-inline d-block p-0 m-0">
                        <li>
                        <a className="nav-link active" data-toggle="pill" href="#basicinfo">Liên hệ và thông tin cơ bản</a>
                        </li>
                        <li>
                        <a className="nav-link" data-toggle="pill" href="#family">Gia đình và mối quan hệ</a>
                        </li>
                        <li>
                        <a className="nav-link" data-toggle="pill" href="#work">Công việc và học vấn</a>
                        </li>
                        <li>
                        <a className="nav-link" data-toggle="pill" href="#lived">Những nơi bạn đã sống</a>
                        </li>
                        <li>
                        <a className="nav-link" data-toggle="pill" href="#details">Chi tiết về bạn</a>
                        </li>
                    </ul>
                    </div>
                    <div className="col-md-9 pl-4">
                    <div className="tab-content">
                        <BasicInfo user={user}/>
                        <Family user={user}/>
                        <WorkAndEdu user={user}/>
                        <Lived user={user}/>
                        <Details user={user}/>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            
        </div>
    )
}

export default About