import React ,{ useEffect,useCallback }from "react";
import _ from "lodash";
import Loader from "./Loader.js";

const InfinityScroll = (props) =>{
    const { children , callNext, is_next, loading } = props;

    const _handleScroll = _.throttle(()=>{
        if(loading){
            return
        }
        const innerHeight = window;
        const {scrollHeight} = document.body;

        const scrollTop = (document.documentElement && document.documentElement.scrollTop) ||
        document.body.scrollTop;
  
        if (scrollHeight - innerHeight - scrollTop < 200) {
            callNext();
        }
    }, 300);

    const handleScroll = useCallback(_handleScroll, [loading]);

    
    useEffect(() => {
        if (loading) {
          return;
        }
    
        if (is_next) {
          window.addEventListener("scroll", handleScroll);
        } else {
          window.removeEventListener("scroll", handleScroll);
        }
    
        return () => window.removeEventListener("scroll", handleScroll);
      }, [is_next, loading]);
    
      return (
        <React.Fragment>
          {children}
          {is_next && <Loader/>}
        </React.Fragment>
      );
}

InfinityScroll.defaultProps = {
    children: null,
    callNext: () => {},
    is_next: false,
    loading: false,
  };
  
export default InfinityScroll;
  