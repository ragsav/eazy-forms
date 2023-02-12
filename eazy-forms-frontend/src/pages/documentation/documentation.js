import { Link, BrowserRouter as Router,Route, Switch } from "react-router-dom";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm'
import "./style.scss";
import about from "../../docs/about.md";
import faq from "../../docs/faq.md";
import integration from "../../docs/integration.md";
import api from "../../docs/api.md";
import { useEffect, useState } from "react";
const BottomNav = ({prev,prevTitle,next,nextTitle}) =>{
    return <div className="documentation-bottomnav-main pb-5">
        <div className="divider mt-3 w-100 mb-4"></div>
        <div className="d-flex flex-row justify-content-stretch align-items-center w-100 mt-4">
        {prev?<div className="pe-2">
            <Link className="prev p-2 px-4" to={prev}>
                <div className="d-flex flex-column justify-content-start align-items-start w-100">
                    <p><span className="me-1">«</span>Previos</p>
                    {prevTitle}
                </div>
            
            </Link></div>:<div></div>}
        {next?<div className="ps-2"><Link className="next p-2 px-4" to={next}><div className="d-flex flex-column justify-content-start align-items-end w-100">
                    <p>Next<span className="ms-1">»</span></p>
                    {nextTitle}
                </div></Link></div>:<div></div>}
        </div>
        
    </div>
}
const About = ({file}) =>{
    const [md,setMd] = useState('');
    useEffect(()=>{
        if(file){
            fetch(file).then((response) => response.text()).then((text) => {
                setMd(text)
            })
        }
    },[file])
    return <div className="text-start">
        <ReactMarkdown children={md} remarkPlugins={[remarkGfm]}/>
        <BottomNav next={"/docs/faq"} nextTitle={"FAQs"}/>
    </div>
}
const FAQ = ({file}) =>{
    const [md,setMd] = useState('');
    useEffect(()=>{
        if(file){
            fetch(file).then((response) => response.text()).then((text) => {
                setMd(text)
            })
        }
    },[file])
    return <div className="text-start">
        <ReactMarkdown children={md} remarkPlugins={[remarkGfm]}/>
        <BottomNav next={"/docs/integration"} nextTitle={"Integration"} prev={"/docs"} prevTitle={"About"}/>
    </div>
}
const Integration = ({file}) =>{
    const [md,setMd] = useState('');
    useEffect(()=>{
        if(file){
            fetch(file).then((response) => response.text()).then((text) => {
                setMd(text)
            })
        }
    },[file])
    return <div className="text-start">
        <ReactMarkdown children={md} remarkPlugins={[remarkGfm]}/>
        <BottomNav prev={"/docs/faq"} prevTitle={"FAQs"} next={"/docs/api"} nextTitle={"API"}/>
    </div>
}
const API = ({file}) =>{
    const [md,setMd] = useState('');
    useEffect(()=>{
        if(file){
            fetch(file).then((response) => response.text()).then((text) => {
                setMd(text)
            })
        }
    },[file])
    return <div className="text-start">
        <ReactMarkdown children={md} remarkPlugins={[remarkGfm]}/>
        <BottomNav prev={"/docs/integration"} prevTitle={"Integration"}/>
    </div>
}
const Documentation = () =>{
    return <div class="documentation-main">
        <div className="documentation-sidebar-main p-3">
            <div className="side-bar">
                <h6 className="mt-0">INTRODUCTION</h6>
                <Link to={"/docs"}>About</Link>
                <Link to={"/docs/faq"}>FAQs</Link>
                <div className="divider mt-3 mb-2"></div>
                <Link to={"/docs/integration"}>Integration</Link>
                <Link to={"/docs/api"}>API</Link>
                <div className="divider mt-3"></div>
            </div>
        </div>
        <div className="documentation-content-main">
            <section className="content-page">
                <Route path="/docs" exact component={()=><About file={about}/>} />
                <Route path="/docs/faq" exact component={()=><FAQ file={faq}/>} />
                <Route path="/docs/integration" exact component={()=><Integration file={integration}/>} />
                <Route path="/docs/api" exact component={()=><API file={api}/>} />
            </section>
            
        </div>
    </div>
}

export default Documentation;