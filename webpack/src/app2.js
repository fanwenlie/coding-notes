import import1, { a, b } from './app2_import1'
import import2 from './app2_import2'
export default function printMe() {
  import1()
  import2()
  a()
  b()
  console.log('I get called from print1.js!');
}