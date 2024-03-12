import Spinner from 'react-bootstrap/Spinner';
import './Loading.css'

export default function Loading() {

    return (
        <div className="carregando">
            <div className="box">
                <Spinner animation="grow" style={{ color: "#6700c8" }}/>
            </div>
        </div>
    )
}