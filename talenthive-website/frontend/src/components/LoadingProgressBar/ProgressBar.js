import React, { useEffect, useState } from "react";
import { useNavigation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const ProgressBar = () => {
  const navigation = useNavigation();
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (navigation.state === "loading") {
      // Khi bắt đầu navigation
      setLoading(true);
      setProgress(0);

      const interval = setInterval(() => {
        setProgress((prev) => (prev >= 90 ? prev : prev + 10)); // Loading giả lập
      }, 200);

      return () => {
        // Xóa interval khi chuyển sang trạng thái khác
        clearInterval(interval);
      };
    } else if (navigation.state === "idle" && loading) {
      // Khi kết thúc navigation
      setProgress(100);
      setTimeout(() => {
        setLoading(false); // Tắt thanh loading
        setProgress(0);
      }, 300); // Đợi một chút trước khi ẩn
    }
  }, [navigation.state, loading]);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          exit={{ width: "100%", opacity: 0 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            height: "4px",
            backgroundColor: "red",
            zIndex: 9999,
            boxShadow: "0 0 10px rgb(0, 0, 0)",
          }}
        />
      )}
    </AnimatePresence>
  );
};

export default ProgressBar;
