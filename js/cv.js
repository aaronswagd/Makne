<script>
function descargarPDF() {
  fetch('cv/M_Garcia_CV.pdf')
    .then(r => r.blob())
    .then(b => {
      const url = URL.createObjectURL(b);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'M_Garcia_CV.pdf';
      a.click();
      URL.revokeObjectURL(url);
    });
}
</script>   
