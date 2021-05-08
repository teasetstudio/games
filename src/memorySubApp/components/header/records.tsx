import { connect } from 'react-redux';
import './records.scss';

const Records: React.FC<{records: any[]}> = ({records}) => {
    return (
        <div className="records">
            <div className="records__wrapper">
                <h3>Рекорды:</h3>
                <ol className="records__list">
                    {records.map(({ name, score }: any, id: number) => (
                        <li key={id}>{name}: {score}</li>
                    ))}
                </ol>
            </div>
        </div>
    )
}

const mapStateToProps = ({records}: any) => ({records});

export default connect(mapStateToProps)(Records);
