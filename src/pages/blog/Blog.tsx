import { useState } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import supabase from '../../api/Supabase';

const Blog = () => {
  const [blogList, setBlogList] = useState([]);

  useEffect(() => {
    getBlogList();
  }, []);

  async function getBlogList() {
    let {data} = await supabase.from('blog').select('*');
    let result:any = data;
    setBlogList(result);
  }

  return (
    <div className="w-full h-fit">
      {
        blogList.map((row: any) => {
           let titleRequest:string = row.title.toLowerCase().replace(/\s/g, '-')
           return <div className="w-full p-6 hover:bg-[#f2f2f2]">
             <Link className="w-full" to={'/blog/' + titleRequest + '/' + row.id}>
               <span className="font-bold text-[#595959]">{row.title}</span>
               <br />
               <span className="text-[#999999] text-[12px]">{row.created_at}</span>
             </Link>
           </div>;
        })
      }
    </div>
  )
}

export default Blog;
