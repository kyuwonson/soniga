"use client";

import Header from "@/components/Header";
import Link from "next/link";
import { HOME_PATH } from "@/lib/paths";
import { useState } from "react";
import { useEstimates } from "@/contexts/EstimatesContext";
import RequireAuth from "@/components/RequireAuth";

// 임의 업체 데이터
const STUDIO_OPTIONS = [
  { id: "s1", name: "로맨틱 스튜디오" },
  { id: "s2", name: "스타일 포토" },
  { id: "s3", name: "러브스토리 스튜디오" },
  { id: "s4", name: "그레이스 포토" },
  { id: "s5", name: "웨딩 포토하우스" },
];

const DRESS_OPTIONS = [
  { id: "d1", name: "러블리 드레스" },
  { id: "d2", name: "웨딩 드레스하우스" },
  { id: "d3", name: "스타일웨딩" },
  { id: "d4", name: "그레이스 드레스" },
  { id: "d5", name: "로맨틱 드레스샵" },
];

const MAKEUP_OPTIONS = [
  { id: "m1", name: "뷰티 스튜디오" },
  { id: "m2", name: "글로우 메이크업" },
  { id: "m3", name: "스타일 메이크업" },
  { id: "m4", name: "러브뷰티" },
  { id: "m5", name: "그레이스 뷰티" },
];

// 샘플 견적 결과 (선택 조합에 따른 결과 - 추후 API 연동)
const SAMPLE_ESTIMATES = [
  { vendorName: "업체 A", totalPrice: "230만원", note: "선택 조합 기준" },
  { vendorName: "업체 B", totalPrice: "250만원", note: "선택 조합 기준" },
  { vendorName: "업체 C", totalPrice: "210만원", note: "선택 조합 기준" },
];

type EstimateType = "sdme" | "dme" | null;
type Step = "type" | "vendor" | "result";

export default function SdmePage() {
  const [step, setStep] = useState<Step>("type");
  const [estimateType, setEstimateType] = useState<EstimateType>(null);
  const [selectedStudio, setSelectedStudio] = useState<string | null>(null);
  const [selectedDress, setSelectedDress] = useState<string | null>(null);
  const [selectedMakeup, setSelectedMakeup] = useState<string | null>(null);
  const [showSavedToast, setShowSavedToast] = useState(false);
  const [estimateDate, setEstimateDate] = useState<string>("");

  const handleTypeSelect = (type: EstimateType) => {
    setEstimateType(type);
    if (type) {
      setStep("vendor");
      setSelectedStudio(null);
      setSelectedDress(null);
      setSelectedMakeup(null);
    } else {
      setStep("type");
    }
  };

  const handleVendorComplete = () => {
    setEstimateDate(new Date().toLocaleDateString("ko-KR"));
    setStep("result");
  };

  const canCompleteVendorSelection = estimateType === "sdme"
    ? selectedStudio && selectedDress && selectedMakeup
    : selectedDress && selectedMakeup;

  const handleReset = () => {
    setStep("type");
    setEstimateType(null);
    setSelectedStudio(null);
    setSelectedDress(null);
    setSelectedMakeup(null);
  };

  // 다른 조합으로 다시 조회 - 견적 유형 유지, 업체 선택만 초기화
  const handleBackToVendorSelect = () => {
    setStep("vendor");
    setSelectedStudio(null);
    setSelectedDress(null);
    setSelectedMakeup(null);
  };

  const { saveEstimate } = useEstimates();

  // 선택한 업체 조합 텍스트
  const getSelectedVendorsText = () => {
    const parts: string[] = [];
    if (estimateType === "sdme" && selectedStudio) {
      parts.push(`스튜디오: ${STUDIO_OPTIONS.find((s) => s.id === selectedStudio)?.name}`);
    }
    if (selectedDress) {
      parts.push(`드레스: ${DRESS_OPTIONS.find((d) => d.id === selectedDress)?.name}`);
    }
    if (selectedMakeup) {
      parts.push(`메이크업: ${MAKEUP_OPTIONS.find((m) => m.id === selectedMakeup)?.name}`);
    }
    return parts.join(", ");
  };

  const handleSaveEstimate = (estimate: {
    category: string;
    estimateType: string;
    vendorName: string;
    totalPrice: string;
    note: string;
  }) => {
    saveEstimate(estimate);
    setShowSavedToast(true);
    setTimeout(() => setShowSavedToast(false), 2500);
  };

  return (
    <RequireAuth>
    <main className="min-h-screen bg-ivory">
      <Header />
      {/* 견적 보관 완료 알림 */}
      {showSavedToast && (
        <div className="fixed top-0 left-0 right-0 z-[100] flex justify-center pt-4">
          <div className="bg-pink-dusty text-white px-6 py-3 rounded-lg shadow-lg animate-[fadeIn_0.3s_ease-out]">
            견적함에 보관되었습니다
          </div>
        </div>
      )}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Breadcrumb & Title */}
        <div className="mb-8 md:mb-12">
          <nav className="flex items-center gap-2 text-sm text-gray-600 mb-4">
            <a href={HOME_PATH} className="hover:text-pink-dusty transition-colors">
              홈
            </a>
            <span>/</span>
            <span className="text-gray-800 font-medium">(스)드메 견적 비교</span>
          </nav>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
            (스)드메 웨딩업체별 견적 비교
          </h1>
          <p className="text-gray-600">
            드레스·메이크업 조합별 실제 비용을 업체별로 비교해보세요
          </p>
        </div>

        {/* 견적 유형 드롭다운 + 업체 선택 (한 화면에 표시) */}
        {(step === "type" || step === "vendor") && (
          <div className="space-y-8">
            {/* 견적 유형 드롭다운 */}
            <div>
              <label className="block text-sm font-medium text-gray-800 mb-2">
                견적 유형
              </label>
              <select
                value={estimateType ?? ""}
                onChange={(e) =>
                  handleTypeSelect(
                    (e.target.value as EstimateType) || null
                  )
                }
                className="w-full md:w-80 px-4 py-3 border border-pink-pale rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-pink-dusty focus:border-transparent"
              >
                <option value="">선택해주세요</option>
                <option value="sdme">스드메 견적 비교</option>
                <option value="dme">드메 견적 비교</option>
              </select>
            </div>

            {/* 업체 선택 - 좌우 병렬 배치, 드롭다운 */}
            {estimateType && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-gray-800">
                    업체를 선택해주세요
                  </h2>
                  <button
                    onClick={handleReset}
                    className="text-sm text-gray-600 hover:text-pink-dusty"
                  >
                    처음으로
                  </button>
                </div>

                <div className="flex flex-col md:flex-row gap-4 md:gap-6 flex-wrap">
                  {/* 스튜디오 (스드메만) */}
                  {estimateType === "sdme" && (
                    <div className="flex-1 min-w-[200px]">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        스튜디오
                      </label>
                      <select
                        value={selectedStudio ?? ""}
                        onChange={(e) =>
                          setSelectedStudio(e.target.value || null)
                        }
                        className="w-full px-4 py-3 border border-pink-pale rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-pink-dusty focus:border-transparent"
                      >
                        <option value="">선택해주세요</option>
                        {STUDIO_OPTIONS.map((studio) => (
                          <option key={studio.id} value={studio.id}>
                            {studio.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  {/* 드레스샵 */}
                  <div className="flex-1 min-w-[200px]">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      드레스샵
                    </label>
                    <select
                      value={selectedDress ?? ""}
                      onChange={(e) =>
                        setSelectedDress(e.target.value || null)
                      }
                      className="w-full px-4 py-3 border border-pink-pale rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-pink-dusty focus:border-transparent"
                    >
                      <option value="">선택해주세요</option>
                      {DRESS_OPTIONS.map((dress) => (
                        <option key={dress.id} value={dress.id}>
                          {dress.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* 메이크업샵 */}
                  <div className="flex-1 min-w-[200px]">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      메이크업샵
                    </label>
                    <select
                      value={selectedMakeup ?? ""}
                      onChange={(e) =>
                        setSelectedMakeup(e.target.value || null)
                      }
                      className="w-full px-4 py-3 border border-pink-pale rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-pink-dusty focus:border-transparent"
                    >
                      <option value="">선택해주세요</option>
                      {MAKEUP_OPTIONS.map((makeup) => (
                        <option key={makeup.id} value={makeup.id}>
                          {makeup.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* 선택 완료 버튼 */}
                <div className="pt-6">
                  <button
                    onClick={handleVendorComplete}
                    disabled={!canCompleteVendorSelection}
                    className={`w-full md:w-auto px-8 py-3 rounded-lg font-medium transition-colors ${
                      canCompleteVendorSelection
                        ? "bg-pink-dusty text-white hover:bg-pink-soft"
                        : "bg-gray-300 text-gray-500 cursor-not-allowed"
                    }`}
                  >
                    견적 조회하기
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Step 3: 견적 결과 */}
        {step === "result" && (
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-1">
                  웨딩업체별 견적
                </h2>
                <p className="text-sm text-gray-600">
                  {estimateType === "sdme"
                    ? "스튜디오 + 드레스 + 메이크업"
                    : "드레스 + 메이크업"}{" "}
                  조합 기준 (견적 데이터는 추후 연동 예정)
                </p>
              </div>
            <button
              onClick={handleBackToVendorSelect}
              className="text-sm text-gray-600 hover:text-pink-dusty"
            >
              다른 조합으로 다시 조회
            </button>
            </div>

            {/* 선택한 업체 요약 */}
            <div className="bg-white rounded-lg border border-pink-pale p-4">
              <h3 className="font-medium text-gray-800 mb-2">선택한 업체</h3>
              <div className="flex flex-wrap gap-2 text-sm">
                {estimateType === "sdme" && selectedStudio && (
                  <span className="px-3 py-1 bg-pink-pale rounded-full text-gray-700">
                    {STUDIO_OPTIONS.find((s) => s.id === selectedStudio)?.name}
                  </span>
                )}
                {selectedDress && (
                  <span className="px-3 py-1 bg-pink-pale rounded-full text-gray-700">
                    {DRESS_OPTIONS.find((d) => d.id === selectedDress)?.name}
                  </span>
                )}
                {selectedMakeup && (
                  <span className="px-3 py-1 bg-pink-pale rounded-full text-gray-700">
                    {MAKEUP_OPTIONS.find((m) => m.id === selectedMakeup)?.name}
                  </span>
                )}
              </div>
            </div>

            {/* 견적 비교 테이블 - Desktop */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full bg-white rounded-lg shadow-sm border border-pink-pale overflow-hidden">
                <thead>
                  <tr className="bg-pink-pale">
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-800">
                      업체명
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-800">
                      합계
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-800">
                      선택 조합
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-800">
                      견적일자
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-800">
                      보관
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {SAMPLE_ESTIMATES.map((estimate, idx) => (
                    <tr
                      key={idx}
                      className="border-t border-pink-pale hover:bg-ivory-light transition-colors"
                    >
                      <td className="px-6 py-4 font-medium text-gray-800">
                        {estimate.vendorName}
                      </td>
                      <td className="px-6 py-4 font-semibold text-pink-dusty">
                        {estimate.totalPrice}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600 max-w-xs">
                        {getSelectedVendorsText()}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {estimateDate}
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() =>
                            handleSaveEstimate({
                              category: "(스)드메",
                              estimateType:
                                estimateType === "sdme" ? "스드메" : "드메",
                              vendorName: estimate.vendorName,
                              totalPrice: estimate.totalPrice,
                              note: `${getSelectedVendorsText()} (${estimateDate})`,
                            })
                          }
                          className="text-sm text-pink-dusty hover:text-pink-soft font-medium"
                        >
                          내 견적함에 보관하기
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* 견적 비교 카드 - Mobile */}
            <div className="md:hidden space-y-4">
              {SAMPLE_ESTIMATES.map((estimate, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-lg shadow-sm border border-pink-pale p-5"
                >
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    {estimate.vendorName}
                  </h3>
                  <div className="space-y-2 mb-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 text-sm">선택 조합</span>
                      <span className="font-semibold text-pink-dusty">
                        {estimate.totalPrice}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm">{getSelectedVendorsText()}</p>
                    <p className="text-gray-500 text-xs">견적일자: {estimateDate}</p>
                  </div>
                  <button
                    onClick={() =>
                      handleSaveEstimate({
                        category: "(스)드메",
                        estimateType:
                          estimateType === "sdme" ? "스드메" : "드메",
                        vendorName: estimate.vendorName,
                        totalPrice: estimate.totalPrice,
                        note: `${getSelectedVendorsText()} (${estimateDate})`,
                      })
                    }
                    className="w-full py-2 text-sm text-pink-dusty hover:text-pink-soft font-medium border border-pink-pale rounded-lg"
                  >
                    내 견적함에 보관하기
                  </button>
                </div>
              ))}
            </div>

            <button
              onClick={handleBackToVendorSelect}
              className="px-6 py-3 border border-pink-dusty text-pink-dusty rounded-lg hover:bg-pink-pale transition-colors"
            >
              다른 조합으로 다시 조회
            </button>
          </div>
        )}

        {/* Back to Home */}
        <div className="mt-10 text-center">
          <a
            href={HOME_PATH}
            className="inline-block px-6 py-3 bg-pink-dusty text-white rounded-lg hover:bg-pink-soft transition-colors"
          >
            홈으로 돌아가기
          </a>
        </div>
      </div>
    </main>
    </RequireAuth>
  );
}
