FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src
COPY ["ship_management/ship_management.csproj", "ship_management/"]
RUN dotnet restore "ship_management/ship_management.csproj"
COPY . .
WORKDIR "/src/ship_management"
RUN dotnet build "ship_management.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "ship_management.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "ship_management.dll"]