import { connect } from 'react-redux';

type TAnyArr = {
    records: {name: string, score: number}[]
};
const Records = ({records}: TAnyArr) => {
    return (
        <div className="records">
            <div className="records__wrapper">
                <h3>Рекорды:</h3>
                <ol className="records__list">
                    {records.map(({ name, score }, id) => (
                        <li key={id}>{name}: {score}</li>
                    ))}
                </ol>
            </div>
        </div>
    )
}

const mapStateToProps = ({records}: TAnyArr) => ({records});

export default connect(mapStateToProps)(Records);
