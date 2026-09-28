import React, { useState, useEffect, useRef, useCallback, useContext } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { Document, Page, pdfjs } from "react-pdf";
import ReadBookData from "../data/Readbookdata";
import "./Reader.css";
import UserContext from "../Context/UserContext";

// 1. Configure local PDF.js worker
if (typeof window !== "undefined") {
  pdfjs.GlobalWorkerOptions.workerSrc = `${window.location.origin}/pdf.worker.min.mjs`;
}

// 2. Configure options outside component for OpenJPEG WASM decoder, cmaps, and fonts
const pdfOptions = {
  cMapUrl:
    typeof window !== "undefined"
      ? `${window.location.origin}/cmaps/`
      : "/cmaps/",
  cMapPacked: true,
  standardFontDataUrl:
    typeof window !== "undefined"
      ? `${window.location.origin}/standard_fonts/`
      : "/standard_fonts/",
  wasmUrl:
    typeof window !== "undefined"
      ? `${window.location.origin}/wasm/`
      : "/wasm/",
};

function Reader() {
  const { currentUser } = useContext(UserContext);

  const { id } = useParams();
  const [searchParams] = useSearchParams();

  const requestedPage = Number(
    searchParams.get("page") || 0
  );

  const isRestart = searchParams.get("restart") === "true";

  const navigate = useNavigate();

  const book = ReadBookData.find(
    (item) => String(item.id) === String(id)
  );

  const isBookmarkNavigation = useRef(false);

  // Unique localStorage key for each book
  const bookmarkKey = `vaasi-bookmark-${currentUser?.email}-${id}`;
const progressKey = `vaasi-progress-${currentUser?.email}-${id}`;
const lastreadKey = `vaasi-lastread-${currentUser?.email}-${id}`;
const totalPagesKey = `vaasi-total-pages-${currentUser?.email}-${id}`;

  const [numPages, setNumPages] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const [readerTheme, setReaderTheme] = useState(
    localStorage.getItem("vaasi-reader-theme") || "light"
  );

  const [readerLayout, setReaderLayout] = useState(
    localStorage.getItem("vaasi-reader-layout") || "auto"
  );

  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined"
      ? window.innerWidth < 900
      : false
  );

  // Mobile always uses single page.
  // Desktop can use Single Page or Two Pages.
  const isSinglePage =
    isMobile || readerLayout === "single";

  // Dimensions
  const [pageWidth, setPageWidth] = useState(440);
  const [pageHeight, setPageHeight] = useState(620);

  // 3D Page Turn State
  const [isTurning, setIsTurning] = useState(false);
  const [turnDirection, setTurnDirection] = useState(null);
  const turnTimeoutRef = useRef(null);

  // =========================================================
  // READING PROGRESS
  // =========================================================

useEffect(() => {
    if (!currentUser || !numPages) return;

    if (isBookmarkNavigation.current) {
        isBookmarkNavigation.current = false;
        return;
    }

    localStorage.setItem(
        progressKey,
        currentPage
    );

    localStorage.setItem(
        lastreadKey,
        Date.now().toString()
    );

}, [
    currentUser,
    currentPage,
    numPages,
    progressKey,
    lastreadKey
]);

  // =========================================================
  // RESPONSIVE LAYOUT
  // =========================================================

  useEffect(() => {
    const handleResize = () => {
      const windowW = window.innerWidth;
      const windowH = window.innerHeight;

      const mobile = windowW < 900;

      setIsMobile(mobile);

      // Available vertical space for reader
      const maxH = Math.max(
        windowH - 160,
        320
      );

      // Single page:
      // - Mobile
      // - Desktop when Single Page is selected
      if (
        mobile ||
        readerLayout === "single"
      ) {
        const w = Math.min(
          windowW - 32,
          maxH * 0.707,
          560
        );

        setPageWidth(Math.round(w));
        setPageHeight(
          Math.round(w * 1.414)
        );

      } else {

        // Two pages side by side + spine + padding
        const maxSingleW = Math.floor(
          (windowW - 160) / 2
        );

        const wFromH = maxH * 0.707;

        const w = Math.min(
          maxSingleW,
          wFromH,
          500
        );

        setPageWidth(Math.round(w));
        setPageHeight(
          Math.round(w * 1.414)
        );
      }
    };

    handleResize();

    window.addEventListener(
      "resize",
      handleResize
    );

    return () => {
      window.removeEventListener(
        "resize",
        handleResize
      );
    };

  }, [readerLayout]);

  // =========================================================
  // CLEANUP TURN TIMEOUT
  // =========================================================

  useEffect(() => {
    return () => {
      if (turnTimeoutRef.current) {
        clearTimeout(
          turnTimeoutRef.current
        );
      }
    };
  }, []);

  // =========================================================
  // RESET WHEN BOOK CHANGES
  // =========================================================

  useEffect(() => {
    setCurrentPage(1);
    setNumPages(null);
    setIsTurning(false);
    setTurnDirection(null);
    setIsBookmarked(false);

  }, [id]);

  // =========================================================
  // DESKTOP PAGE ALIGNMENT
  // =========================================================

  useEffect(() => {

    if (!isSinglePage) {

      // Two-page mode uses two-page spreads.
      // Current page should always be odd.
      if (currentPage % 2 === 0) {
        setCurrentPage(
          (prev) => Math.max(
            1,
            prev - 1
          )
        );
      }
    }

  }, [
    isSinglePage,
    currentPage
  ]);

  // =========================================================
  // THEME
  // =========================================================

  const handleThemeChange = (theme) => {
    setReaderTheme(theme);

    localStorage.setItem(
      "vaasi-reader-theme",
      theme
    );
  };

  // =========================================================
  // PAGE LAYOUT
  // =========================================================

  const handleLayoutChange = (layout) => {
    setReaderLayout(layout);

    localStorage.setItem(
      "vaasi-reader-layout",
      layout
    );

    // Stop any running two-page animation
    setIsTurning(false);
    setTurnDirection(null);
  };

  // =========================================================
  // PDF LOAD SUCCESS
  // =========================================================
const onDocumentLoadSuccess = (pdfDoc) => {

    if (!currentUser) return;

    console.log(`[VAASI Reader] Loaded "${book?.title}" with ${pdfDoc.numPages} pages.`);

    isBookmarkNavigation.current = true;
    setNumPages(pdfDoc.numPages);

    localStorage.setItem(
        totalPagesKey,
        pdfDoc.numPages
    );

    const savedPage = Number(
        localStorage.getItem(bookmarkKey)
    );

    const savedProgress =
        localStorage.getItem(progressKey);

    const savedProgressPage =
        Number(savedProgress);

    if (isRestart) {
        setCurrentPage(1);
        setIsBookmarked(false);
    } else if (
        requestedPage &&
        requestedPage >= 1 &&
        requestedPage <= pdfDoc.numPages
    ) {
        const pageToOpen =
            !isSinglePage &&
            requestedPage % 2 === 0
                ? requestedPage - 1
                : requestedPage;

        setCurrentPage(pageToOpen);
        setIsBookmarked(true);
    } else if (
        savedProgressPage &&
        savedProgressPage >= 1 &&
        savedProgressPage <= pdfDoc.numPages
    ) {
        setCurrentPage(savedProgressPage);
    } else if (
        savedPage &&
        savedPage >= 1 &&
        savedPage <= pdfDoc.numPages
    ) {
        const pageToOpen =
            !isSinglePage &&
            savedPage % 2 === 0
                ? savedPage - 1
                : savedPage;

        setCurrentPage(pageToOpen);
        setIsBookmarked(true);
    } else {
        setCurrentPage(1);
        setIsBookmarked(false);
    }
};

  // =========================================================
  // PDF LOAD ERROR
  // =========================================================

  const onDocumentLoadError = (err) => {
    console.error(
      "[VAASI Reader] Document load error:",
      err
    );
  };

  // =========================================================
  // BOOKMARK
  // =========================================================

  const handleBookmark = () => {

    if (isBookmarked) {

      // Remove bookmark
      localStorage.removeItem(
        bookmarkKey
      );

      setIsBookmarked(false);

      console.log(
        `[VAASI Reader] Bookmark removed for book ${id}`
      );

    } else {

      // Save current page
      localStorage.setItem(
        bookmarkKey,
        String(currentPage)
      );

      setIsBookmarked(true);

      console.log(
        `[VAASI Reader] Bookmark saved at page ${currentPage}`
      );
    }
  };

  // =========================================================
  // TURN NEXT
  // =========================================================

  const nextPage = useCallback(() => {

    if (isTurning) return;

    // SINGLE PAGE MODE
    if (isSinglePage) {

      if (
        !numPages ||
        currentPage < numPages
      ) {

        setCurrentPage(
          (prev) => prev + 1
        );
      }

    } else {

      // TWO-PAGE MODE
      if (
        !numPages ||
        currentPage + 1 < numPages
      ) {

        setIsTurning(true);
        setTurnDirection("next");

        turnTimeoutRef.current =
          setTimeout(() => {

            setCurrentPage(
              (prev) => prev + 2
            );

            setIsTurning(false);
            setTurnDirection(null);

          }, 750);
      }
    }

  }, [
    isTurning,
    isSinglePage,
    numPages,
    currentPage
  ]);

  // =========================================================
  // TURN PREVIOUS
  // =========================================================

  const previousPage = useCallback(() => {

    if (isTurning) return;

    // SINGLE PAGE MODE
    if (isSinglePage) {

      if (currentPage > 1) {

        setCurrentPage(
          (prev) => prev - 1
        );
      }

    } else {

      // TWO-PAGE MODE
      if (currentPage > 1) {

        setIsTurning(true);
        setTurnDirection("prev");

        turnTimeoutRef.current =
          setTimeout(() => {

            setCurrentPage(
              (prev) =>
                Math.max(
                  1,
                  prev - 2
                )
            );

            setIsTurning(false);
            setTurnDirection(null);

          }, 750);
      }
    }

  }, [
    isTurning,
    isSinglePage,
    currentPage
  ]);

  // =========================================================
  // HOVER TRIGGERS
  // =========================================================

  const hoverCooldownRef =
    useRef(false);

  const handleCornerHoverNext =
    useCallback(() => {

      if (
        isTurning ||
        hoverCooldownRef.current
      ) {
        return;
      }

      if (
        numPages &&
        currentPage + 1 >= numPages
      ) {
        return;
      }

      hoverCooldownRef.current = true;

      nextPage();

      setTimeout(() => {
        hoverCooldownRef.current = false;
      }, 900);

    }, [
      isTurning,
      numPages,
      currentPage,
      nextPage
    ]);

  const handleCornerHoverPrev =
    useCallback(() => {

      if (
        isTurning ||
        hoverCooldownRef.current
      ) {
        return;
      }

      if (currentPage <= 1) {
        return;
      }

      hoverCooldownRef.current = true;

      previousPage();

      setTimeout(() => {
        hoverCooldownRef.current = false;
      }, 900);

    }, [
      isTurning,
      currentPage,
      previousPage
    ]);

  // =========================================================
  // KEYBOARD NAVIGATION
  // =========================================================

  useEffect(() => {

    const handleKeyDown = (e) => {

      if (e.key === "ArrowLeft") {
        previousPage();

      } else if (e.key === "ArrowRight") {
        nextPage();
      }
    };

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };

  }, [
    previousPage,
    nextPage
  ]);
  // login check

  if (!currentUser) {
    return (
        <div className="reader-not-found">
            <div className="not-found-card">
                <h2>Please Login</h2>
                <p>You need to login to read books.</p>

                <button onClick={() => navigate("/login")}>
                    Login
                </button>
            </div>
        </div>
    );
}

  // =========================================================
  // BOOK NOT FOUND
  // =========================================================

  if (!book) {

    return (
      <div className="reader-not-found">

        <div className="not-found-card">

          <h2>
            Book Not Found
          </h2>

          <p>
            The requested book could not be found in the VAASI library.
          </p>

          <button
            onClick={() =>
              navigate("/Read")
            }
            className="back-library-btn"
          >

            <i className="fa-solid fa-arrow-left"></i>

            Return to Read Section

          </button>

        </div>

      </div>
    );
  }

  // =========================================================
  // DISABLED CHECKS
  // =========================================================

  const isPrevDisabled =
    currentPage <= 1 ||
    isTurning;

  const isNextDisabled =
    (
      numPages
        ? isSinglePage
          ? currentPage >= numPages
          : currentPage + 1 >= numPages
        : false
    ) ||
    isTurning;

  // =========================================================
  // RENDER PDF PAGE
  // =========================================================

  const renderPdfPage = (
    pageNum,
    keySuffix = ""
  ) => {

    if (
      !pageNum ||
      (numPages &&
        pageNum > numPages)
    ) {

      return (
        <div
          className="book-end-paper"
          style={{
            width: pageWidth,
            height: pageHeight,
          }}
        >

          <div className="end-paper-content">

            <i className="fa-solid fa-book-open"></i>

            <p className="end-paper-title">
              VAASI
            </p>

            <p className="end-paper-subtitle">
              End of Book
            </p>

          </div>

        </div>
      );
    }

    return (
      <Page
        key={`page_${book.id}_${pageNum}${keySuffix}`}
        pageNumber={pageNum}
        width={pageWidth}
        height={pageHeight}
        renderTextLayer={false}
        renderAnnotationLayer={false}
        suspense={false}
        loading={
          <div
            className="reader-page-placeholder"
            style={{
              width: pageWidth,
              height: pageHeight,
            }}
          >

            <i className="fa-solid fa-circle-notch fa-spin"></i>

            <p>
              Rendering page {pageNum}...
            </p>

          </div>
        }
      />
    );
  };

  // =========================================================
  // MAIN UI
  // =========================================================

  return (
    <div
      className={`reader-container ${readerTheme}`}
    >

      {/* =====================================================
          HEADER
      ===================================================== */}

      <header className="reader-header">

        <div className="reader-header-left">

          <button
            className="reader-back-btn"
            onClick={() =>
              navigate("/Read")
            }
            aria-label="Back to Read section"
            title="Back to Read"
          >

            <i className="fa-solid fa-arrow-left"></i>

          </button>

          <div className="reader-book-info">

            <h1 className="reader-title">
              {book.title}
            </h1>

            <span className="reader-author">
              {book.author}
            </span>

          </div>

        </div>

        <div className="reader-header-right">

          {/* BOOKMARK BUTTON */}

          <button
            className={`reader-icon-btn ${
              isBookmarked
                ? "active"
                : ""
            }`}
            onClick={handleBookmark}
            aria-label="Bookmark this page"
            title={
              isBookmarked
                ? "Remove Bookmark"
                : "Bookmark Page"
            }
          >

            <i
              className={
                isBookmarked
                  ? "fa-solid fa-bookmark"
                  : "fa-regular fa-bookmark"
              }
            ></i>

          </button>

          {/* SETTINGS BUTTON */}

          <button
            className="reader-icon-btn"
            aria-label="Reader Settings"
            title="Settings"
            onClick={() =>
              setShowSettings(
                !showSettings
              )
            }
          >

            <i className="fa-solid fa-gear"></i>

          </button>

          {showSettings && (

            <div className="reader-settings">

              <h3>
                Reader Settings
              </h3>

              {/* THEME */}

              <div className="settings-group">

                <p>
                  Theme
                </p>

                <button
                  className={
                    readerTheme === "light"
                      ? "active"
                      : ""
                  }
                  onClick={() =>
                    handleThemeChange(
                      "light"
                    )
                  }
                >
                  Light
                </button>

                <button
                  className={
                    readerTheme === "sepia"
                      ? "active"
                      : ""
                  }
                  onClick={() =>
                    handleThemeChange(
                      "sepia"
                    )
                  }
                >
                  Sepia
                </button>

                <button
                  className={
                    readerTheme === "dark"
                      ? "active"
                      : ""
                  }
                  onClick={() =>
                    handleThemeChange(
                      "dark"
                    )
                  }
                >
                  Dark
                </button>

              </div>

              {/* PAGE LAYOUT */}

              <div className="settings-group">

                <p>
                  Page Layout
                </p>

                <button
                  className={
                    readerLayout === "single"
                      ? "active"
                      : ""
                  }
                  onClick={() =>
                    handleLayoutChange(
                      "single"
                    )
                  }
                >
                  Single Page
                </button>

                <button
                  className={
                    readerLayout === "double"
                      ? "active"
                      : ""
                  }
                  onClick={() =>
                    handleLayoutChange(
                      "double"
                    )
                  }
                >
                  Two Pages
                </button>

              </div>

              <button
                className="settings-close"
                onClick={() =>
                  setShowSettings(false)
                }
              >
                Close
              </button>

            </div>

          )}

        </div>

      </header>

      {/* =====================================================
          MAIN READER VIEWPORT
      ===================================================== */}

      <main className="reader-main">

        {/* LEFT NAVIGATION */}

        <button
          className="reader-side-nav reader-side-prev"
          onClick={previousPage}
          disabled={isPrevDisabled}
          aria-label="Previous Page"
          title="Previous Page"
        >

          <i className="fa-solid fa-chevron-left"></i>

        </button>

        <div className="reader-viewport">

          <Document
            file={book.bookFile}
            options={pdfOptions}
            onLoadSuccess={
              onDocumentLoadSuccess
            }
            onLoadError={
              onDocumentLoadError
            }
            suspense={false}
            loading={

              <div className="reader-feedback">

                <i className="fa-solid fa-circle-notch fa-spin"></i>

                <p>
                  Opening book...
                </p>

              </div>

            }
            error={

              <div className="reader-feedback error">

                <i className="fa-solid fa-triangle-exclamation"></i>

                <p>
                  Failed to load the book PDF.
                </p>

              </div>

            }
          >

            {/* =================================================
                SINGLE PAGE
            ================================================= */}

            {isSinglePage ? (

              <div
                className="book-single-wrapper"
                style={{
                  width: pageWidth,
                  height: pageHeight,
                }}
              >

                <div className="book-page book-page-single">

                  {renderPdfPage(
                    currentPage
                  )}

                  {/* Single Page Corner Trigger */}

                  <div
                    className="corner-curl-zone corner-right"
                    onClick={nextPage}
                    title="Tap to turn page"
                  >

                    <div className="corner-dogear corner-dogear-right" />

                  </div>

                </div>

              </div>

            ) : (

              /* =================================================
                  TWO PAGE BOOK
              ================================================= */

              <div
                className={`real-book ${
                  isTurning
                    ? "is-turning"
                    : ""
                }`}
                style={{
                  width:
                    pageWidth * 2 + 24,
                  height: pageHeight,
                }}
              >

                {/* BOOK COVER RIM */}

                <div className="book-cover-rim" />

                {/* =================================================
                    LEFT PAGE
                ================================================= */}

                <div
                  className="book-page book-page-left"
                  style={{
                    width: pageWidth,
                    height: pageHeight,
                  }}
                >

                  <div className="page-surface">

                    {renderPdfPage(
                      turnDirection === "prev"
                        ? Math.max(
                            1,
                            currentPage - 2
                          )
                        : currentPage,

                      turnDirection === "prev"
                        ? "_base_prev"
                        : "_base"
                    )}

                  </div>

                  {/* LEFT SPINE SHADOW */}

                  <div
                    className="spine-shadow spine-shadow-left"
                  />

                  {/* LEFT CORNER */}

                  {!isPrevDisabled && (

                    <div
                      className="corner-curl-zone corner-left"
                      onMouseEnter={
                        handleCornerHoverPrev
                      }
                      onClick={
                        previousPage
                      }
                      title="Move mouse here to turn previous page"
                    >

                      <div className="corner-dogear corner-dogear-left">

                        <span className="corner-label">
                          Prev
                        </span>

                      </div>

                    </div>

                  )}

                  {/* LEFT PAGE NUMBER */}

                  <div className="page-corner-num page-corner-num-left">

                    {currentPage}

                  </div>

                </div>

                {/* =================================================
                    CENTER SPINE
                ================================================= */}

                <div
                  className="book-spine"
                  style={{
                    height: pageHeight,
                  }}
                />

                {/* =================================================
                    RIGHT PAGE
                ================================================= */}

                <div
                  className="book-page book-page-right"
                  style={{
                    width: pageWidth,
                    height: pageHeight,
                  }}
                >

                  <div className="page-surface">

                    {renderPdfPage(
                      turnDirection === "next"
                        ? currentPage + 3
                        : currentPage + 1,

                      turnDirection === "next"
                        ? "_base_next"
                        : "_base"
                    )}

                  </div>

                  {/* RIGHT SPINE SHADOW */}

                  <div
                    className="spine-shadow spine-shadow-right"
                  />

                  {/* RIGHT CORNER */}

                  {!isNextDisabled && (

                    <div
                      className="corner-curl-zone corner-right"
                      onMouseEnter={
                        handleCornerHoverNext
                      }
                      onClick={
                        nextPage
                      }
                      title="Move mouse here to turn next page"
                    >

                      <div className="corner-dogear corner-dogear-right">

                        <span className="corner-label">
                          Next
                        </span>

                      </div>

                    </div>

                  )}

                  {/* RIGHT PAGE NUMBER */}

                  {numPages &&
                    currentPage + 1 <=
                      numPages && (

                      <div className="page-corner-num page-corner-num-right">

                        {currentPage + 1}

                      </div>

                    )}

                </div>

                {/* =================================================
                    3D TURNING LEAF - NEXT
                ================================================= */}

                {isTurning &&
                  turnDirection ===
                    "next" && (

                    <div
                      className="turning-leaf turn-next"
                      style={{
                        width: pageWidth,
                        height: pageHeight,
                        left:
                          pageWidth + 24,
                      }}
                    >

                      {/* FRONT */}

                      <div className="leaf-face leaf-front">

                        {renderPdfPage(
                          currentPage + 1,
                          "_turning_front"
                        )}

                        <div className="turning-shadow-front" />

                      </div>

                      {/* BACK */}

                      <div className="leaf-face leaf-back">

                        {renderPdfPage(
                          currentPage + 2,
                          "_turning_back"
                        )}

                        <div className="turning-shadow-back" />

                      </div>

                    </div>

                  )}

                {/* =================================================
                    3D TURNING LEAF - PREVIOUS
                ================================================= */}

                {isTurning &&
                  turnDirection ===
                    "prev" && (

                    <div
                      className="turning-leaf turn-prev"
                      style={{
                        width: pageWidth,
                        height: pageHeight,
                        left: 0,
                      }}
                    >

                      {/* FRONT */}

                      <div className="leaf-face leaf-front">

                        {renderPdfPage(
                          currentPage,
                          "_turning_front"
                        )}

                        <div className="turning-shadow-front" />

                      </div>

                      {/* BACK */}

                      <div className="leaf-face leaf-back">

                        {renderPdfPage(
                          currentPage - 1,
                          "_turning_back"
                        )}

                        <div className="turning-shadow-back" />

                      </div>

                    </div>

                  )}

              </div>

            )}

          </Document>

        </div>

        {/* RIGHT NAVIGATION */}

        <button
          className="reader-side-nav reader-side-next"
          onClick={nextPage}
          disabled={isNextDisabled}
          aria-label="Next Page"
          title="Next Page"
        >

          <i className="fa-solid fa-chevron-right"></i>

        </button>

      </main>

      {/* =====================================================
          FOOTER
      ===================================================== */}

      <footer className="reader-footer">

        <button
          className="reader-footer-btn"
          onClick={previousPage}
          disabled={isPrevDisabled}
        >

          <i className="fa-solid fa-arrow-left"></i>

          <span>
            Previous
          </span>

        </button>

        {/* PAGE INDICATOR */}

        <div className="reader-page-indicator">

          <span>

            {isSinglePage

              ? `Page ${currentPage} of ${
                  numPages || "..."
                }`

              : numPages

              ? currentPage + 1 <=
                numPages

                ? `Pages ${currentPage}–${
                    currentPage + 1
                  } of ${numPages}`

                : `Page ${currentPage} of ${numPages}`

              : `Page ${currentPage} of ...`}

          </span>

        </div>

        <button
          className="reader-footer-btn"
          onClick={nextPage}
          disabled={isNextDisabled}
        >

          <span>
            Next
          </span>

          <i className="fa-solid fa-arrow-right"></i>

        </button>

      </footer>

    </div>
  );
}

export default Reader;