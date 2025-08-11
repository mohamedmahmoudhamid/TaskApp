import Typography from '@mui/material/Typography'
function Header() {
  return (
    <header style={{ background: '#333', color: '#fff', padding: '1rem' }}>
      <h1>هذا هو الهيدر</h1>
      <Typography variant="h1" color="initial">Mohamed</Typography>
      <a href="/">العودة للرئيسية</a>
    </header>
  );
}
export default  Header;