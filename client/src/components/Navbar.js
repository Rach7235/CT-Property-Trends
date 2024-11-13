export default function Navbar() {
    return (
        <nav style={{backgroundColor: '#0047AB', padding: '10px', display: 'flex', alignItems: 'center'}}>
            <span style={{
                color: 'white',
                fontSize: '24px',
                fontWeight: 'bold',
                textDecoration: 'none',
                marginRight: 'auto'
            }}>
                CT Property Trends
            </span>
            <ul style={{listStyleType: 'none', display: 'flex', margin: 0, padding: 0}}>
                <li style={{marginleft: '20px'}}>
                    <a style={{
                        color: 'white',
                        fontSize: '20px',
                        padding: '10px 20px',
                        textDecoration: 'none',
                        borderRadius: '5px',
                        display: 'inline-block'
                    }}
                       href="/">Home</a>
                </li>
                <li style={{marginleft: '20px'}}>
                    <a style={{
                        color: 'white',
                        fontSize: '20px',
                        padding: '10px 20px',
                        textDecoration: 'none',
                        borderRadius: '5px',
                        display: 'inline-block'
                    }}
                       href="/form">Query</a>
                </li>
            </ul>
        </nav>
    );
}