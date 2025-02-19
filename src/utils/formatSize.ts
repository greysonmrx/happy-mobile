export default function formatSize(bytes: number, decimal?: number): string {
  const sizes = ['bytes', 'kb', 'mb', 'gb', 'tb', 'pb', 'eb', 'zb', 'yb'];
  const power = 2**10;

  const i = Math.floor(Math.log(bytes) / Math.log(power));

  const size = parseFloat((bytes / Math.pow(power, i)).toFixed(decimal || 0)).toString();

  return `${size.replace(/\B(?=(\d{3})+(?!\d))/g, ".")}${sizes[i]}`
}